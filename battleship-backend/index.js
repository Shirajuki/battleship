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
const finishTurn = (game, clients) => {
  // Update players turn

  // Update boards
  game.updateBoards();
  game.displayBoards();
  clients[0].emit("updateBoard", JSON.stringify(game.p1));
  clients[1].emit("updateBoard", JSON.stringify(game.p2));
};

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("create", async (room) => {
    // Check if room is full before joining
    const sockets = await io.in(room).fetchSockets();
    if (sockets.length < 2) socket.join(room);
    const clients = await io.in(room).fetchSockets();

    // Initialize battleship game
    if (clients.length === 2) {
      const p1 = new Player(clients[0].id);
      const p2 = new Player(clients[1].id);
      const game = new Game(p1, p2);
      games[room] = game;

      // Send initialized board to players
      game.placeShip({ shipIndex: 1, pos: { x: 5, y: 5 }, playerId: p1.id });
      game.placeShip({ shipIndex: 1, pos: { x: 5, y: 2 }, playerId: p2.id });
      game.updateBoards();
      game.shootShip({ pos: { x: 5, y: 2 }, playerId: p1.id });
      game.updateBoards();
      game.displayBoards();
      //io.to(room).emit("updateBoard", JSON.stringify(game.p1));
      clients[0].emit("updateBoard", JSON.stringify(game.p1));
      clients[1].emit("updateBoard", JSON.stringify(game.p2));
    }
    console.log(clients.map((s) => s.id));
  });

  socket.on("place", async (data) => {
    const { room, ...placeData } = data;
    const clients = await io.in(room).fetchSockets();

    if ([...socket.rooms].includes(room)) {
      const game = games[room];
      game.placeShip(placeData);
      finishTurn(game, clients);
    }
  });

  socket.on("shoot", async (data) => {
    const { room, ...shootData } = data;
    const clients = await io.in(room).fetchSockets();

    if ([...socket.rooms].includes(room)) {
      const game = games[room];
      game.shootShip(shootData);
      finishTurn(game, clients);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
