import { useDrag } from "react-dnd";

const Ship = ({ hit, index, drag = false }) => {
  const [{ _isDragging }, dragRef] = useDrag({
    type: "ship",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div class={`ship ${hit ? "hit" : ""}`} ref={drag ? dragRef : null}>
      <div>
        <p>Ship</p>
      </div>
    </div>
  );
};
export default Ship;
