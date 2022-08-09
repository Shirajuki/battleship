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

io.on("connection", (socket) => {
  console.log("a user connected");
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
      game.updateBoards();
      game.displayBoards();
      io.to(room).emit("updateBoard", JSON.stringify(game.p1));
    }
    console.log(clients.map((s) => s.id));
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
