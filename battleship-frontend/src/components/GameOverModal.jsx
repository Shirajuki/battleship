import player1 from "../assets/player1.png";
import player2 from "../assets/player2.png";
import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import { rematch } from "../lib/actions";
import { useEffect, useState } from "preact/hooks";

const GameOverModal = connect(
  ["socket", "room"],
  actions
)(({ socket, room, info }) => {
  const [requestedRematch, setRequestedRematch] = useState(false);
  const [rematchPlayers, setRematchPlayers] = useState([]);

  const rematchHandler = () => {
    setRequestedRematch(true);
    rematch(socket, room);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("pendingRematch", (player) => {
      console.log(player);
      if (player === "") return;
      setRematchPlayers((p) => {
        const newp = [player, ...p];
        console.log(newp);
        if (newp.includes("player1") && newp.includes("player2")) {
          console.log("both player rematch...");
          setRequestedRematch(false);
          return [];
        }
        return newp;
      });
    });
    return () => {
      socket.off("pendingRematch");
    };
  }, [socket]);

  return (
    <div class="gameOverModal">
      <h2>{info.text}</h2>
      <p>{info.text}</p>
      <div>
        <div>
          {(rematchPlayers.includes("player1") && (
            <img
              class="rematch"
              src={player1}
              alt="player1 rematch indicator"
            />
          )) ||
            (rematchPlayers.length > 1 && (
              <img
                class="rematch"
                src={player1}
                alt="player1 rematch indicator"
              />
            ))}
          <img
            src={info.player === "player1" ? player1 : player2}
            alt={`${info.player} indicator`}
          />
          {(rematchPlayers.includes("player2") && (
            <img
              class="rematch"
              src={player2}
              alt="player2 rematch indicator"
            />
          )) ||
            (rematchPlayers.length > 1 && (
              <img
                class="rematch"
                src={player2}
                alt="player2 rematch indicator"
              />
            ))}
        </div>
        <button onClick={rematchHandler}>Rematch</button>
        <button onClick={() => (window.location.href = "/")}>
          Back to lobby
        </button>
      </div>
    </div>
  );
});
export default GameOverModal;
