import Ships from "../assets/ships.png";

const Marker = ({ hit }) => {
  return (
    <div class={`marker ${hit ? "hit" : ""}`}>
      <div
        class="tile"
        style={{
          mask: `url(${Ships}) left center`,
          WebkitMask: `url(${Ships}) left center`,
          maskPosition: `${-50 * 3}px ${-50 * 3}px`,
          WebkitMaskPosition: `${-50 * 3}px ${-50 * 3}px`,
        }}
      />
    </div>
  );
};
export default Marker;
