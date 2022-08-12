export const shoot = (socket, room, pos) => {
  console.log("shoot");
  socket.emit("shoot", {
    pos: pos,
    playerId: socket.id,
    room: room,
  });
};

export const place = (socket, room, pos, shipIndex) => {
  console.log("place");
  socket.emit("place", {
    shipIndex: shipIndex,
    pos: pos,
    playerId: socket.id,
    room: room,
  });
};

export const endPlace = (socket, room) => {
  console.log("endplace");
  socket.emit("endPlace", {
    playerId: socket.id,
    room: room,
  });
};
