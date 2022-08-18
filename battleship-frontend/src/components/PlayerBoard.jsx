import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import BoardSquare from "./BoardSquare";
import { place } from "../lib/actions";
import { gameState } from "../lib/constants";

const PlayerBoard = connect(
  ["socket", "room"],
  actions
)(({ board, game, socket, room }) => {
  const renderSquare = (x, y) => {
    const onDropHandler = (item, x, y) => {
      if (game.state === gameState.place)
        place(socket, room, { x: x, y: y }, item.index);
    };

    return (
      <BoardSquare
        key={`${x}-${y}`}
        onClick={() => {}}
        x={x}
        y={y}
        game={game}
        droppable={game.state === gameState.place}
        onDrop={onDropHandler}
        tile={board[y][x]}
      />
    );
  };
  if (board.length === 0) return <></>;

  return (
    <div
      class={`board playerBoard ${
        game.state === gameState.place ? "bigBoard" : "smallBoard"
      }`}
      style={{
        gridTemplate: `repeat(${board[0]?.length}, 1fr) / repeat(${board.length}, 1fr)`,
      }}
    >
      {board.map((row, y) => row.map((_column, x) => renderSquare(x, y)))}
    </div>
  );
});

export default PlayerBoard;
