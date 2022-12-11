import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/action";
import { url } from "../helpers/apiHelpers";
import AlertComponent from "./AlertComponent";

export default function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleclose = () => {
    setOpen(false);
  };

  //   const joinChessRoom = () => {
  //     if (username === " ") return alert("please enter all details");
  //     socket.emit("join_room", {
  //       username,
  //     });

  //     dispatch(addUser({ username }));

  //     navigate(`/waiting`);
  //   };

  const login = async () => {
    if (!username || !password) {
      setMessage("Please fill all details");
      setOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${url}/login`, {
        username: username,
        password: password,
      });

      const data = response.data;

      if (data.status === 200) {
        localStorage.setItem("_id", data.user._id);
        navigate("/home");
        dispatch(addUser(data.user));
      } else {
        setOpen(true);
        setMessage(data.message);
      }
    } catch (e) {
      console.log("Error while login", e.message);
    }
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

        <input
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button style={loginButtonStyle} onClick={login}>
          {" "}
          Login
        </button>

        <h5
          onClick={() => {
            props.setIsLogin(!props.isLogin);
          }}
          style={createNewAccountStyle}
        >
          {" "}
          Create new account
        </h5>
      </div>

      <AlertComponent open={open} handleclose={handleclose} message={message} />
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
  width: 300,
  height: 250,
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

const loginButtonStyle = {
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

const createNewAccountStyle = {
  color: "#09396B",
  cursor: "pointer",
};
