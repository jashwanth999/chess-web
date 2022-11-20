import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, addUsers } from "../api/action";
import { socket } from "../helpers/socketHelper";

export default function Home() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const users = useSelector((state) => state.users.users);

  const joinChessRoom = () => {
    // if (users.length > 1) {
    //   return alert("room full");
    // }
    socket.emit("join_room", {
      username,
      roomId,
    });

    dispatch(addUser({ username, roomId }));

    navigate(`/waiting/${roomId}`);
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
