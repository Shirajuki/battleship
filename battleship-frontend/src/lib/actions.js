export const shoot = (socket, room, pos) => {
  socket.emit("shoot", {
    pos: pos,
    playerId: socket.id,
    room: room,
  });
};

export const place = (socket, room, pos, shipIndex) => {
  socket.emit("place", {
    shipIndex: shipIndex,
    pos: pos,
    playerId: socket.id,
    room: room,
  });
};

export const endPlace = (socket, room) => {
  socket.emit("endPlace", {
    playerId: socket.id,
    room: room,
  });
};

export const rematch = (socket, room) => {
  socket.emit("rematch", {
    playerId: socket.id,
    room: room,
  });
};
