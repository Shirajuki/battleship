import { useDrag } from "react-dnd";

const ShipDraggable = ({ index }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "ship",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div ref={dragRef}>
      <p>
        a ship - {index} {isDragging && "😱"}
      </p>
    </div>
  );
};
export default ShipDraggable;
