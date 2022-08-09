import { useState, useEffect } from "preact/hooks";
import io from "socket.io-client";
import "./app.css";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(socket?.connected ?? false);
  const [room, setRoom] = useState("room1");

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("connected", socket.id);
      socket.emit("create", room);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("updateBoard", (board) => {
      console.log(board);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("updateBoard");
    };
  }, [socket]);

  const sendPing = () => {
    socket.emit("create", "room1");
  };

  return (
    <>
      <h1>Battleship</h1>
      <div class="card"></div>
    </>
  );
};

export default App;
