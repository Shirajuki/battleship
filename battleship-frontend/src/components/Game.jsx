import { useAutoAnimate } from "@formkit/auto-animate/react";
import EnemyBoard from "./EnemyBoard";
import PlayerBoard from "./PlayerBoard";

const Game = ({ game }) => {
  const [parent] = useAutoAnimate();
  if (!game) return <></>;

  return (
    <div ref={parent}>
      <div class="boardWrapper">
        <PlayerBoard game={game} board={game.playerBoard} />
        <EnemyBoard game={game} board={game.enemyBoard} />
      </div>
    </div>
  );
};

export default Game;
