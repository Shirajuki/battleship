import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

import Game from "./game.js";
import Player from "./models/player.js";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const games = [];
const rematch = [];
const initializeGame = (room, clients) => {
  console.log("Initializing new game...");
  const p1 = new Player(clients[0].id);
  const p2 = new Player(clients[1].id);
  const game = new Game(p1, p2);
  games[room] = game;

  // Send game start signal
  io.to(room).emit("startGame");
  // Send update boards to players
  updateBoards(game, clients);
};
const updateBoards = (game, clients) => {
  game.updateBoards();
  clients[0].emit(
    "updateBoard",
    JSON.stringify({
      ...game.p1,
      turn: game.checkPlayerTurn(game.p1.id),
      state: game.phase,
      player: "player1",
    })
  );
  clients[1].emit(
    "updateBoard",
    JSON.stringify({
      ...game.p2,
      turn: game.checkPlayerTurn(game.p2.id),
      state: game.phase,
      player: "player2",
    })
  );
};
const finishTurn = (game, clients) => {
  // Check win
  const win = game.checkWin();
  if (win) {
    clients[0].emit("endGame", {
      text: win?.player === game.p1.id ? "Win" : "Lose",
      player: "player1",
    });
    clients[1].emit("endGame", {
      text: win?.player === game.p2.id ? "Win" : "Lose",
      player: "player2",
    });
  }

  // Update boards
  updateBoards(game, clients);
};

const listGames = (io) => {
  const rooms = [...io.sockets.adapter.rooms]
    .filter((r) => ![...r[1]].includes(r[0]))
    .map((r) => {
      return { code: r[0], players: [...r[1]].length };
    });
  console.log(rooms);
  io.emit("games", rooms);
};

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
  listGames(io);

  socket.on("create", async (room) => {
    // Check if room is full before joining
    const sockets = await io.in(room).fetchSockets();
    if (sockets.length >= 2) return;
    // Join and check if clients are enough
    socket.join(room);
    const clients = await io.in(room).fetchSockets();
    console.log(clients.length);
    console.log(clients.map((s) => s.id));
    listGames(io);
    // Initialize battleship game
    if (clients.length >= 2) {
      clients[0].emit("joinedLobby", 2);
      clients[1].emit("joinedLobby", 2);
      setTimeout(() => {
        initializeGame(room, clients);
        socket.emit("joinedLobby", 0);
      }, 2000);
    } else socket.emit("joinedLobby", 1);
  });

  socket.on("place", async (data) => {
    const { room, ...placeData } = data;
    const clients = await io.in(room).fetchSockets();

    if ([...socket.rooms].includes(room)) {
      const game = games[room];
      if (game.placeShip(placeData)?.status) finishTurn(game, clients);
    }
  });

  socket.on("shoot", async (data) => {
    const { room, ...shootData } = data;
    const clients = await io.in(room).fetchSockets();

    if ([...socket.rooms].includes(room)) {
      const game = games[room];
      const status = game.shootShip(shootData)?.status;
      if (!status) return;
      // TODO: Send sunken ship data
      if (status === 3) {
        clients[0].emit("shipSunk");
        clients[1].emit("shipSunk");
      }
      finishTurn(game, clients);
    }
  });

  socket.on("endPlace", async (data) => {
    const { room, ...playerId } = data;
    const clients = await io.in(room).fetchSockets();

    if ([...socket.rooms].includes(room)) {
      const game = games[room];
      if (game.endPlace(playerId)?.status) finishTurn(game, clients);
    }
  });

  socket.on("rematch", async (data) => {
    const { room, playerId } = data;
    const clients = await io.in(room).fetchSockets();

    if ([...socket.rooms].includes(room)) {
      const player =
        playerId === clients[0].id
          ? "player1"
          : playerId === clients[1].id
          ? "player2"
          : "";
      clients[0].emit("pendingRematch", player);
      clients[1].emit("pendingRematch", player);
      if (rematch.includes(room)) {
        setTimeout(() => initializeGame(room, clients), 2000);
        rematch.splice(rematch.indexOf(room), 1);
      } else rematch.push(room);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
