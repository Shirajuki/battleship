const BoardSquare = ({ children, onClick }) => {
  return (
    <div onClick={onClick} class="boardSquare">
      {children}
    </div>
  );
};
export default BoardSquare;
