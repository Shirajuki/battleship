import { useState, useEffect } from "preact/hooks";
import { connect } from "unistore/preact";
import { actions } from "../lib/state";
import player1 from "../assets/player1.png";
import player2 from "../assets/player2.png";
import vs from "../assets/vs.png";

const Lobby = connect(
  ["socket", "room"],
  actions
)(({ socket, room, setRoom }) => {
  const [privateGame, setPrivateGame] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");
  const [games, setGames] = useState([]);
  const [playersInLobby, setPlayersInLobby] = useState(0);

  const hostGame = () => {
    console.log("host game");
    const alph = "abcdefghijklmnopqrstuvwxyz0123456789";
    const room = Array.from(
      "000000",
      () => alph[Math.floor(Math.random() * alph.length)]
    ).join("");
    console.log(room);
    setRoom(room);
    socket.emit("create", room);
  };
  const joinGame = (code) => {
    console.log("join game", code);
    setRoom(code);
    socket.emit("create", code);
  };

  useEffect(() => {
    if (!socket) return;
    console.log("load");
    socket.on("joinedLobby", (playerCount) => {
      setPlayersInLobby(playerCount);
      console.log(playerCount);
    });
    return () => {
      socket.off("joinedLobby");
    };
  }, [socket]);

  const displayGameStatus = (playerCount) =>
    `${playerCount > 1 ? "ingame" : "waiting"} - ${playerCount} ${
      playerCount > 1 ? "players" : "player"
    }`;
  return (
    <div class="lobbyWrapper">
      {playersInLobby === 0 ? (
        <>
          <div>
            <input
              type="checkbox"
              name="private"
              id="private"
              onChange={(event) => setPrivateGame(event.target.checked)}
            />
            <label htmlFor="private">Private game</label>
          </div>
          <button onClick={hostGame}>Host game</button>
          <span>. . .</span>
          <div>
            <input
              type="text"
              placeholder="lobby code..."
              onChange={(event) => setLobbyCode(event.target.value)}
            />
            <button onClick={() => joinGame(lobbyCode)}>join</button>
          </div>
          <div>
            {games.map((game) => (
              <button disabled={game.players > 1}>
                {game.code} <span>{displayGameStatus(game.players)}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1>Game code</h1>
          <p>{room}</p>
          <div class="players">
            <img
              src={player1}
              class={playersInLobby < 1 ? "disabled" : ""}
              alt="player1 indicator"
            />
            <img class="vs" src={vs} alt="vs indicator" />
            <img
              src={player2}
              class={playersInLobby < 2 ? "disabled" : ""}
              alt="player2 indicator"
            />
          </div>
        </>
      )}
    </div>
  );
});
export default Lobby;
