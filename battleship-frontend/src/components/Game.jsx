import { useState, useEffect, useReducer } from "preact/hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Battleship from "../lib/battleship.js";
import Board from "./Board";
import PlayerHand from "./PlayerHand";

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

  return (
    <div ref={parent}>
      <p>Player - {game.playerId}</p>
      <div class="boardWrapper">
        <PlayerHand ships={game.ships} />
        <Board
          type={"playerBoard"}
          board={game.playerBoard}
          state={game.state}
        />
        <Board type={"enemyBoard"} board={game.enemyBoard} state={game.state} />
      </div>
    </div>
  );
};

export default Game;
