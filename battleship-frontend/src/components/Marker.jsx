import Parts from "../assets/parts.png";
import Ship from "./Ship";

const Marker = ({ hit, ship }) => {
  if (ship && hit) return <Ship hit={hit} ship={ship} />;

  return (
    <div class={`marker ${hit ? "hit" : ""}`}>
      <div
        class="tile"
        style={{
          mask: `url(${Parts}) left center`,
          WebkitMask: `url(${Parts}) left center`,
          maskPosition: `${-50 * 3}px ${-50 * 3}px`,
          WebkitMaskPosition: `${-50 * 3}px ${-50 * 3}px`,
        }}
      />
    </div>
  );
};
export default Marker;
