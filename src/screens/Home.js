import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../helpers/socketHelper";

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const joinChessRoom = () => {
    socket.emit("join_room", roomId);

    navigate(`/room/${roomId}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2> Welcome to Chess</h2>
      <h3 style={{ margin: 4 }}> Username</h3>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <br />
      <h3 style={{ margin: 4 }}> Room Id</h3>

      <input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="enter roomid"
      />

      <button onClick={joinChessRoom}> Join</button>
    </div>
  );
}
