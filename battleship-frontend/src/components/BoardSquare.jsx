import { useDrop } from "react-dnd";
import Marker from "./Marker";
import Ship from "./Ship";

const BoardSquare = ({ tile, onClick, onDrop, droppable, x, y, game }) => {
  const [{ _isOver }, dropRef] = useDrop({
    accept: "ship",
    drop: (item) => onDrop(item, x, y),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const renderTile = (tile) => {
    switch (tile) {
      case 1:
        return <Ship draggable ship={game.getShip(x, y)} drag={droppable} />;
      case 2:
        return <Marker hit={false} />;
      case 3:
        return <Marker hit={true} />;
      case 4:
        return <Ship hit={true} ship={game.getShip(x, y)} drag={false} />;
      default:
        return <></>;
    }
  };

  return (
    <div class="boardSquare" ref={droppable ? dropRef : null} onClick={onClick}>
      <div>{renderTile(tile)}</div>
    </div>
  );
};
export default BoardSquare;
