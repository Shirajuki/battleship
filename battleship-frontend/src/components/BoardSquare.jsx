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
    const shipIndex = game.getShipIndex(x, y);
    switch (tile) {
      case 1:
        return <Ship draggable index={shipIndex} drag={droppable} />;
      case 2:
        return <Marker hit={false} />;
      case 3:
        return <Marker hit={true} />;
      case 4:
        return <Ship hit={true} index={shipIndex} drag={false} />;
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
