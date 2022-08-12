import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import BoardSquare from "./BoardSquare";
import Marker from "./Marker";
import Ship from "./Ship";
import { shoot, place } from "../lib/actions";
import { gameState, selectionType } from "../lib/constants";

const Board = connect(
  ["socket", "room", "selection"],
  actions
)(({ type, board, state, socket, room, selection, setSelection }) => {
  let boardStyle = state === gameState.place ? "smallBoard" : "bigBoard";
  if (type === "playerBoard")
    boardStyle = state === gameState.place ? "bigBoard" : "smallBoard";
  const boardLength =
    Math.max.apply(
      null,
      board.map((b) => b?.length ?? 0)
    ) * board.length;

  const renderSquare = (i) => {
    const y = Math.floor(i / board.length);
    const x = i % board[0]?.length;

    const eventHandler = (_event) => {
      if (state === 0 && selection?.type === selectionType.ship) {
        place(socket, room, { x: x, y: y }, selection.index);
        setSelection(null);
      } else if (state === 1) {
        shoot(socket, room, { x: x, y: y });
      }
    };

    return (
      <BoardSquare key={i} onClick={eventHandler}>
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
      class={`board ${
        type === "playerBoard" ? "playerBoard" : "enemyBoard"
      } ${boardStyle}`}
      style={{
        gridTemplate: `repeat(${board[0]?.length}, 1fr) / repeat(${board.length}, 1fr)`,
      }}
    >
      {squares}
    </div>
  );
});

export default Board;
