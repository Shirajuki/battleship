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
  const p1 = new Player(clients[0].id, "player1");
  const p2 = new Player(clients[1].id, "player2");
  const game = new Game(p1, p2);
  games[room] = game;

  // Send game start signal
  io.to(room).emit("startGame");
  // Send update boards to players
  updateBoards(game, clients);
};
const updateBoards = (game, clients) => {
  if (clients.length !== 2) return;
  game.updateBoards();
  clients[0].emit(
    "updateBoard",
    JSON.stringify({
      ...game.p1,
      turn: game.checkPlayerTurn(game.p1.id),
      state: game.phase,
    })
  );
  clients[1].emit(
    "updateBoard",
    JSON.stringify({
      ...game.p2,
      turn: game.checkPlayerTurn(game.p2.id),
      state: game.phase,
    })
  );
};
const finishTurn = (game, clients) => {
  if (clients.length !== 2) return;
  // Check win
  const win = game.checkWin();
  if (win) {
    clients[0].emit("endGame", {
      text: win?.player === game.p1.id ? "Win" : "Lose",
      player: game.p1.player,
    });
    clients[1].emit("endGame", {
      text: win?.player === game.p2.id ? "Win" : "Lose",
      player: game.p2.player,
    });
  }
  // Update boards
  updateBoards(game, clients);
};

const listGames = (io) => {
  const rooms = [...io.sockets.adapter.rooms]
    .filter((r) => ![...r[1]].includes(r[0]))
    .filter((r) => games[r[0]]?.phase !== 2)
    .map((r) => {
      return { code: r[0], players: [...r[1]].length };
    });
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
    listGames(io);
    // Initialize battleship game
    if (clients.length === 2) {
      clients[0].emit("joinedLobby", 2);
      clients[1].emit("joinedLobby", 2);
      setTimeout(() => {
        initializeGame(room, clients);
        socket.emit("joinedLobby", 0);
      }, 1500);
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
      const { status } = game.shootShip(shootData);
      if (!status) return;
      if (status === 3 && clients.length === 2) {
        clients[0].emit("shipSunk", JSON.stringify(game.sunkenShips));
        clients[1].emit("shipSunk", JSON.stringify(game.sunkenShips));
      }
      finishTurn(game, clients);
    }
  });

  socket.on("endPlace", async (data) => {
    const { room, ...playerId } = data;
    const clients = await io.in(room).fetchSockets();

    if ([...socket.rooms].includes(room)) {
      const game = games[room];
      if (game.endPlace(playerId)?.status && clients.length === 2) {
        clients[0].emit(
          "endPlace",
          game.getPlayerById(playerId.playerId).player
        );
        clients[1].emit(
          "endPlace",
          game.getPlayerById(playerId.playerId).player
        );
        finishTurn(game, clients);
      }
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
    console.log("User disconnected");
  });
});

app.get("/", (_req, res) => {
  res.json("Battleship server online...");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});
