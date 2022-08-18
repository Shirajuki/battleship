import { useState, useEffect, useReducer } from "preact/hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Battleship from "../lib/battleship.js";
import Board from "./Board";
import PlayerHand from "./PlayerHand";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Game = ({ socket, room }) => {
  const [game] = useState(new Battleship(room));
  const [, rerender] = useReducer((x) => x + 1, 0);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (!socket) return;
    socket.on("updateBoard", (board) => {
      game.updateBoards(JSON.parse(board));
      rerender();
    });
    return () => {
      socket.off("updateBoard");
    };
  }, [socket]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div ref={parent}>
        <p>Player - {game.playerId}</p>
        <div class="boardWrapper">
          <PlayerHand ships={game.ships} />
          <Board type={"playerBoard"} game={game} board={game.playerBoard} />
          <Board type={"enemyBoard"} game={game} board={game.enemyBoard} />
        </div>
      </div>
    </DndProvider>
  );
};

export default Game;
