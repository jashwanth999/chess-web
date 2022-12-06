import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, addUsers } from "../api/action";
import { socket } from "../helpers/socketHelper";

export default function Home() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const joinChessRoom = () => {
    if (username === " ") return alert("please enter all details");
    socket.emit("join_room", {
      username,
    });

    dispatch(addUser({ username }));

    navigate(`/waiting`);
  };

  return (
    <div style={rootDiv}>
      <div style={loginDiv}>
        <h2> A23 Chess</h2>

        <input
          style={inputStyle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <br />

        <button style={joinButtonStyle} onClick={joinChessRoom}>
          {" "}
          Join
        </button>
      </div>
    </div>
  );
}

const rootDiv = {
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  alignItems: "center",
  backgroundColor: "rgb(46, 46, 46)",
};

const loginDiv = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: 250,
  height: 200,
  borderRadius: 5,
  backgroundColor: "rgb(255, 253, 234)",
};

const inputStyle = {
  width: "60%",
  padding: 5,
  outline: "none",
  backgroundColor: "rgb(255, 253, 234)",
  border: "none",
  borderBottom: "1px solid black",
};

const joinButtonStyle = {
  backgroundColor: "green",
  width: "28%",
  padding: 5,
  border: "none",
  outline: "none",
  borderRadius: 2,
  color: "white",
  marginTop: 8,
  cursor: "pointer",
};
