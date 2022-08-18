import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import { endPlace } from "../lib/actions";
import { useDrop } from "react-dnd";
import ShipDraggable from "./ShipDraggable";

const PlayerHand = connect(
  ["socket", "room"],
  actions
)(({ socket, room, ships }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "ship",
    drop: (item) => console.log(item),
    // setBasket((basket) =>
    //   !basket.includes(item) ? [...basket, item] : basket
    // )
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <div>
      <div ref={dropRef}>
        {ships.map((ship, index) => {
          if (!ship.placed) return <ShipDraggable draggable index={index} />;
        })}
        {isOver && <div>Drop Here!</div>}
      </div>
      <button onClick={() => endPlace(socket, room)}>end turn</button>
    </div>
  );
});
export default PlayerHand;
