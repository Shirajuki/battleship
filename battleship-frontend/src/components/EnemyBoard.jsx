import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import BoardSquare from "./BoardSquare";
import { shoot } from "../lib/actions";
import { gameState } from "../lib/constants";

const EnemyBoard = connect(
  ["socket", "room"],
  actions
)(({ board, game, socket, room }) => {
  const renderSquare = (x, y) => {
    const onClickHandler = (_event) => {
      if (game.state === gameState.shoot) {
        shoot(socket, room, { x: x, y: y });
      }
    };

    return (
      <BoardSquare
        key={`${x}-${y}`}
        onClick={onClickHandler}
        x={x}
        y={y}
        game={game}
        droppable={game.state === gameState.place}
        onDrop={() => {}}
        tile={board[y][x]}
      />
    );
  };
  if (board.length === 0) return <></>;

  return (
    <div
      class={`board enemyBoard ${
        game.state === gameState.place ? "smallBoard" : "bigBoard"
      }`}
      style={{
        gridTemplate: `repeat(${board[0]?.length}, 1fr) / repeat(${board.length}, 1fr)`,
      }}
    >
      {board.map((row, y) => row.map((_column, x) => renderSquare(x, y)))}
    </div>
  );
});

export default EnemyBoard;
