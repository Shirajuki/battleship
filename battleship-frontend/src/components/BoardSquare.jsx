import { Droppable } from "react-beautiful-dnd";

const BoardSquare = ({ children, onClick, id }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          class="boardSquare"
          onClick={onClick}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div>{children}</div>
          <span style={{ display: "none" }}>{provided.placeholder}</span>
        </div>
      )}
    </Droppable>
  );
};
export default BoardSquare;
