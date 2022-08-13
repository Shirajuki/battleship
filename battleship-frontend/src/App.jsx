import { useState, useEffect } from "preact/hooks";
import { connect } from "unistore/preact";
import io from "socket.io-client";
import { actions } from "./lib/state";
import Game from "./components/Game";

const App = connect(
  ["socket", "room"],
  actions
)(({ socket, room, setSocket }) => {
  const [isConnected, setIsConnected] = useState(socket?.connected ?? false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      socket.emit("create", room);
      setIsConnected(true);
      console.log("connected", room, socket.id);
    });

    socket.on("startGame", () => {
      setGameStarted(true);
      console.log("STAAART", isConnected, gameStarted);
    });

    socket.on("endGame", (status) => {
      setGameStarted(false);
      console.log("GAMEEE ENDD", status);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("startGame");
      socket.off("endGame");
      socket.off("disconnect");
    };
  }, [socket]);

  const joinRoom = () => {
    socket.emit("create", "room1");
  };

  return (
    <>
      <h1>Battleship - {"" + isConnected}</h1>
      <Game socket={socket} room={room} />
    </>
  );
});

export default App;
