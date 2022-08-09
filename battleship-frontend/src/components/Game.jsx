import { useState, useEffect, useReducer } from "preact/hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Battleship from "../battleship.js";
import Board from "./Board";

const Game = ({ socket }) => {
  const [game] = useState(new Battleship());
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

  return (
    <div ref={parent}>
      <p>Player - {game.playerId}</p>
      <div class="boardWrapper">
        <Board className={"playerBoard"} board={game.playerBoard} />
        <Board className={"enemyBoard"} board={game.enemyBoard} />
      </div>
    </div>
  );
};

export default Game;
