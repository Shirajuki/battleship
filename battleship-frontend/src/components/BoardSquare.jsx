import { useState, useEffect } from "preact/hooks";
import { connect } from "unistore/preact";
import { actions } from "../state";

const BoardSquare = connect(
  ["socket", "room"],
  actions
)(({ socket, room, children, x, y }) => {
  const shoot = () => {
    console.log("shoot");
    socket.emit("shoot", {
      pos: { x: x, y: y },
      playerId: socket.id,
      room: room,
    });
  };

  const place = () => {
    console.log("place");
    socket.emit("place", {
      shipIndex: 0,
      pos: { x: x, y: y },
      playerId: socket.id,
      room: room,
    });
  };

  return (
    <div onClick={() => place()} class="boardSquare">
      {children}
    </div>
  );
});
export default BoardSquare;
