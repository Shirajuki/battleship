import { useState, useEffect, useReducer } from "preact/hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { connect } from "unistore/preact";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { actions } from "./lib/state";
import io from "socket.io-client";
import Battleship from "./lib/battleship.js";
import Game from "./components/Game";
import PlayerHand from "./components/PlayerHand";
import { gameState } from "./lib/constants.js";
import GameOverModal from "./components/GameOverModal";
import Lobby from "./components/Lobby";

const App = connect(
  ["socket", "room"],
  actions
)(({ socket, room, setSocket }) => {
  const [parent] = useAutoAnimate();
  const [isConnected, setIsConnected] = useState(socket?.connected ?? false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState({ status: false, info: {} });
  const [game, setGame] = useState(null);
  const [, rerender] = useReducer((x) => x + 1, 0);

  const displayState = (state) => {
    switch (state) {
      case gameState.place:
        return "Place phase";
      case gameState.shoot:
        return "Shoot phase";
      case gameState.end:
        return "End phase";
      default:
        return "Battleship";
    }
  };

  const displayStatus = (game) => {
    if (game.state === gameState.shoot)
      return game.playerTurn ? "Your turn" : "Enemy turn";
    return ""; // TODO: add end turn display
  };

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("connected", room, socket.id);
    });

    socket.on("startGame", () => {
      setGameStarted(true);
      setGameEnded({ status: false, info: {} });
      console.log("STAAART", true);
    });

    socket.on("endGame", (info) => {
      setGameEnded({ status: true, info: info });
      console.log("GAMEEE ENDD", info);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("updateBoard", (board) => {
      if (!game)
        setGame((_) => {
          const g = new Battleship(room);
          g.updateBoards(JSON.parse(board));
          return g;
        });
      else game.updateBoards(JSON.parse(board));
      rerender();
    });

    return () => {
      socket.off("connect");
      socket.off("startGame");
      socket.off("updateBoard");
      socket.off("endGame");
      socket.off("disconnect");
    };
  }, [socket]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        class={`gameWrapper ${
          game?.state === gameState.place ? "place" : "shoot"
        }`}
        ref={parent}
      >
        {gameStarted && game?.state === gameState.place && (
          <PlayerHand ships={game.ships} />
        )}
        {gameStarted && game && (
          <div class="game">
            <h1>{displayState(game?.state)}</h1>
            <p>{displayStatus(game)}</p>
            <Game game={game} />
          </div>
        )}
        {!gameStarted && (
          <div class="lobby">
            <Lobby />
          </div>
        )}
        {gameStarted && game && <div class="room">{room}</div>}
      </div>
      {gameEnded?.status && <GameOverModal info={gameEnded.info} />}
    </DndProvider>
  );
});

export default App;
