import { useDrop } from "react-dnd";

const BoardSquare = ({ children, onClick, onDrop, id, droppable }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "ship",
    drop: (item) => onDrop(item, id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div class="boardSquare" ref={droppable ? dropRef : null} onClick={onClick}>
      <div>{children}</div>
    </div>
  );
};
export default BoardSquare;
