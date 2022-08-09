const Marker = ({ hit }) => {
  return <div class={`marker ${hit ? "hit" : ""}`}>Marker</div>;
};
export default Marker;
