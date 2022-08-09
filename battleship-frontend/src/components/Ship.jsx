const Ship = ({ hit }) => {
  return <div class={`ship ${hit ? "hit" : ""}`}>Ship</div>;
};
export default Ship;
