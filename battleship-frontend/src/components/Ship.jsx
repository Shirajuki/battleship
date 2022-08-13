import { Draggable } from "react-beautiful-dnd";

const Ship = ({ hit, index, id }) => {
  return (
    <div class={`ship ${hit ? "hit" : ""}`}>
      <Draggable draggableId={"ship" + id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p>Ship</p>
          </div>
        )}
      </Draggable>
    </div>
  );
};
export default Ship;
