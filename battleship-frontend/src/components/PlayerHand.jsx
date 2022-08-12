import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import { selectionType } from "../lib/constants";
import { endPlace } from "../lib/actions";

const PlayerHand = connect(
  ["socket", "room", "selection"],
  actions
)(({ socket, room, ships, selection, setSelection }) => {
  console.log(selection);
  return (
    <div>
      {ships.map((ship, index) => {
        if (!ship.placed)
          return (
            <div
              onClick={() =>
                setSelection({ type: selectionType.ship, index: index })
              }
            >
              <p>a ship - {index}</p>
            </div>
          );
      })}
      <button onClick={() => endPlace(socket, room)}>end turn</button>
    </div>
  );
});
export default PlayerHand;
