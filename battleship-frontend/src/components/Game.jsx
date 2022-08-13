import { useState, useEffect, useReducer } from "preact/hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Battleship from "../lib/battleship.js";
import Board from "./Board";
import PlayerHand from "./PlayerHand";
import { place } from "../lib/actions";
import { DragDropContext } from "react-beautiful-dnd";
import { gameState } from "../lib/constants.js";

const Game = ({ socket, room }) => {
  const [game] = useState(new Battleship(room));
  const [, rerender] = useReducer((x) => x + 1, 0);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (!socket) return;
    socket.on("updateBoard", (board) => {
      game.updateBoards(JSON.parse(board));
      rerender();
      console.log(game);
    });
    return () => {
      socket.off("updateBoard");
    };
  }, [socket]);

  const onDragEnd = ({ draggableId, type, reason, source, destination }) => {
    console.log(draggableId, type, reason, source, destination);

    const data = destination?.droppableId?.split("-");
    const index = +draggableId?.replace("ship", "");
    console.log(data, index);
    if (data && !isNaN(index) && game.state === gameState.place)
      place(socket, room, { x: +data[1], y: +data[2] }, index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div ref={parent}>
        <p>Player - {game.playerId}</p>
        <div class="boardWrapper">
          <PlayerHand ships={game.ships} />
          <Board type={"playerBoard"} game={game} board={game.playerBoard} />
          <Board type={"enemyBoard"} game={game} board={game.enemyBoard} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Game;
