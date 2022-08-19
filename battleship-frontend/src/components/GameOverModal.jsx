import player1 from "../assets/player1.png";
import player2 from "../assets/player2.png";
import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import { rematch } from "../lib/actions";
import { useEffect } from "preact/hooks";

const GameOverModal = connect(
  ["socket", "room"],
  actions
)(({ socket, room, text, player }) => {
  text = "Win";
  player = "player2";

  useEffect(() => {
    if (!socket) return;
    socket.on("pendingRematch", (players) => {
      console.log(players);
    });
    return () => {
      socket.off("pendingRematch");
    };
  }, [socket]);

  return (
    <div class="gameOverModal">
      <h2>{text}</h2>
      <p>{text}</p>
      <div>
        <div>
          <img class="rematch" src={player1} alt="player1 rematch indicator" />
          <img
            src={player === "player1" ? player1 : player2}
            alt={`${player} indicator`}
          />
          <img class="rematch" src={player1} alt="player1 rematch indicator" />
        </div>
        <button onClick={() => rematch(socket, room)}>Rematch</button>
        <button onClick={() => (window.location.href = "/")}>
          Back to lobby
        </button>
      </div>
    </div>
  );
});
export default GameOverModal;
