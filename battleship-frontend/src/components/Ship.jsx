import { useDrag } from "react-dnd";
import Ships from "../assets/ships.png";

const Ship = ({ hit, ship, drag = false }) => {
  const [{ _isDragging }, dragRef] = useDrag({
    type: "ship",
    item: { index: ship.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div class={`ship ${hit ? "hit" : ""}`} ref={drag ? dragRef : null}>
      <div
        class="tile"
        style={{
          mask: `url(${Ships}) left center`,
          WebkitMask: `url(${Ships}) left center`,
          maskPosition: `${-50 * ship.part.sprite.x}px ${
            -50 * ship.part.sprite.y
          }px`,
          WebkitMaskPosition: `${-50 * ship.part.sprite.x}px ${
            -50 * ship.part.sprite.y
          }px`,
        }}
      />
    </div>
  );
};
export default Ship;
