import EnemyBoard from "./EnemyBoard";
import PlayerBoard from "./PlayerBoard";

const Game = ({ game }) => {
  if (!game) return <></>;

  return (
    <div>
      <div class="boardWrapper">
        <PlayerBoard game={game} board={game.playerBoard} />
        <EnemyBoard game={game} board={game.enemyBoard} />
      </div>
    </div>
  );
};

export default Game;
