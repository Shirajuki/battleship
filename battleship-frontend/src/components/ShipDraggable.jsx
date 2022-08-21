import { useDrag } from "react-dnd";
import Ships from "../assets/ships.png";

const ShipDraggable = ({ index, ship }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "ship",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div ref={dragRef}>
      <div
        class="shipDraggable"
        style={{
          background: `url(${Ships}) left center`,
          backgroundPosition: `${-ship.img.x}px ${-ship.img.y}px`,
          width: `${ship.img.width}px`,
          height: `${ship.img.height}px`,
        }}
      ></div>
    </div>
  );
};
export default ShipDraggable;
