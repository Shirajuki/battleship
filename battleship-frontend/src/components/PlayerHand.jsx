import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import { endPlace } from "../lib/actions";
import ShipDraggable from "./ShipDraggable";

const PlayerHand = connect(
  ["socket", "room"],
  actions
)(({ socket, room, ships }) => {
  return (
    <div class="hand">
      <div>
        {ships.map((ship, index) => {
          if (!ship.placed) return <ShipDraggable draggable index={index} />;
        })}
      </div>
      <button onClick={() => endPlace(socket, room)}>end turn</button>
    </div>
  );
});
export default PlayerHand;
