import { useState, useEffect } from "preact/hooks";
import { connect } from "unistore/preact";
import { actions } from "../lib/state";

const Lobby = connect(
  ["socket", "room"],
  actions
)(({ socket, room, setRoom }) => {
  const [privateGame, setPrivateGame] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");
  const [games, setGames] = useState([]);

  const hostGame = () => {
    console.log("host game");
  };
  const joinGame = (code) => {
    console.log("join game", code);
  };

  useEffect(() => {
    console.log("load");
  }, []);

  const displayGameStatus = (playerCount) =>
    `${playerCount > 1 ? "ingame" : "waiting"} - ${playerCount} ${
      playerCount > 1 ? "players" : "player"
    }`;
  return (
    <div class="lobbyWrapper">
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
    </div>
  );
});
export default Lobby;
