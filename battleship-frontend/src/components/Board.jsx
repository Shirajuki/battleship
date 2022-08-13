import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import BoardSquare from "./BoardSquare";
import Marker from "./Marker";
import Ship from "./Ship";
import { shoot } from "../lib/actions";
import { gameState } from "../lib/constants";

const Board = connect(
  ["socket", "room"],
  actions
)(({ type, board, game, socket, room }) => {
  let boardStyle = game.state === gameState.place ? "smallBoard" : "bigBoard";
  if (type === "playerBoard")
    boardStyle = game.state === gameState.place ? "bigBoard" : "smallBoard";
  const boardLength =
    Math.max.apply(
      null,
      board.map((b) => b?.length ?? 0)
    ) * board.length;

  const renderSquare = (i) => {
    const y = Math.floor(i / board.length);
    const x = i % board[0]?.length;

    const eventHandler = (_event) => {
      if (game.state === gameState.shoot) {
        shoot(socket, room, { x: x, y: y });
      }
    };

    const shipIndex = game.getShipIndex(x, y);

    return (
      <BoardSquare
        key={i}
        onClick={eventHandler}
        id={`${type}-${x}-${y}`}
        droppable={game.state === gameState.place}
      >
        {board[y][x] === 1 && (
          <Ship
            index={i}
            id={shipIndex}
            drag={game.state === gameState.place}
          />
        )}
        {board[y][x] === 2 && <Marker hit={false} />}
        {board[y][x] === 3 && <Marker hit={true} />}
        {board[y][x] === 4 && (
          <Ship hit={true} index={i} id={shipIndex} drag={false} />
        )}
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
