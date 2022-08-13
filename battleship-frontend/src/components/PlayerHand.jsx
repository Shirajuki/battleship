import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import { endPlace } from "../lib/actions";
import { Droppable } from "react-beautiful-dnd";
import ShipDraggable from "./ShipDraggable";

const PlayerHand = connect(
  ["socket", "room"],
  actions
)(({ socket, room, ships }) => {
  return (
    <div>
      <Droppable droppableId={"hand"}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {ships.map((ship, index) => {
              if (!ship.placed) return <ShipDraggable index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button onClick={() => endPlace(socket, room)}>end turn</button>
    </div>
  );
});
export default PlayerHand;
