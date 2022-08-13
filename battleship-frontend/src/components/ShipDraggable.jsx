import { Draggable } from "react-beautiful-dnd";

const ShipDraggable = ({ index }) => {
  console.log(111, index);
  return (
    <Draggable draggableId={"ship" + index} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>a ship - {index}</p>
        </div>
      )}
    </Draggable>
  );
};
export default ShipDraggable;
