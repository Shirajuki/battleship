import BoardSquare from "./BoardSquare";
import Marker from "./Marker";
import Ship from "./Ship";

const Board = ({ board, className }) => {
  const boardLength =
    Math.max.apply(
      null,
      board.map((b) => b?.length ?? 0)
    ) * board.length;

  const renderSquare = (i) => {
    const y = Math.floor(i / board.length);
    const x = i % board[0]?.length;
    return (
      <BoardSquare key={i} x={x} y={y}>
        {board[y][x] === 1 && <Ship />}
        {board[y][x] === 2 && <Marker hit={false} />}
        {board[y][x] === 3 && <Marker hit={true} />}
        {board[y][x] === 4 && <Ship hit={true} />}
      </BoardSquare>
    );
  };
  if (board.length === 0) return <></>;
  const squares = Array.from(new Array(boardLength), (_, index) =>
    renderSquare(index)
  );
  return (
    <div
      class={`board ${className}`}
      style={{
        gridTemplate: `repeat(${board[0]?.length}, 1fr) / repeat(${board.length}, 1fr)`,
      }}
    >
      {squares}
    </div>
  );
};

export default Board;
