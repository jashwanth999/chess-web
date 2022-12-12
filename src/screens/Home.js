import { Avatar, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/action";
import { socket, url } from "../helpers/apiHelpers";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const _id = localStorage.getItem("_id");
        const response = await axios.post(`${url}/get-user`, {
          _id,
        });

        const data = response.data;

        dispatch(addUser(data.user));

        if (data.user.isInGame) {
          socket.emit("reconnection", { roomId: data.user.activeGameRoomId });
          navigate(`/room/${data.user.activeGameRoomId}`);
        }
      } catch (e) {
        console.log("Error while fetching user details", e.message);
      }
    };
    getUserDetails();
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem("_id");
    navigate("/");
  };

  const joinChessRoom = () => {
    if (user?.username === "") return alert("please enter all details");
    socket.emit("join_room", {
      username: user?.username,
    });

    navigate(`/waiting`);
  };

  return (
    <div style={rootDiv}>
      <div
        style={{
          height: 60,
          display: "flex",
          width: "100%",
          backgroundColor: "#eabf69",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "#07C058" }}>
            {user?.username && user?.username[0]}
          </Avatar>
          <h3 style={{ marginLeft: 5 }}> {user?.username}</h3>
        </div>

        <img
          src={"https://www.a23.com/index_assets/images/a23-games-logo.svg"}
          alt=""
          style={{ height: 40, width: 40, margin: 5 }}
        />

        <Button onClick={logout} style={{ fontWeight: "bold" }}>
          {" "}
          Logout
        </Button>
      </div>

      <div style={{ padding: 10 }}>
        <h2 style={{ color: "white" }}> Play </h2>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Button onClick={joinChessRoom} style={timeComp}>
            3 min
          </Button>
          <Button style={timeComp}>5 min</Button>
          <Button style={timeComp}>10 min</Button>
          <Button style={timeComp}>15 min</Button>
          <Button style={timeComp}>30 min</Button>
        </div>
        <br />

        <h2 style={{ color: "white" }}> Other </h2>

        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Button style={otherComponent}>Custom Game</Button>
          <Button style={otherComponent}>Play Friend</Button>
        </div>
      </div>
    </div>
  );
}

const rootDiv = {
  display: "flex",
  height: "100vh",
  backgroundColor: "rgb(46, 46, 46)",
  flexDirection: "column",
};

const timeComp = {
  color: "white",
  backgroundColor: "#05274B",
  height: 60,
  margin: 2,
  fontSize: 20,
};

const otherComponent = {
  color: "white",
  backgroundColor: "#05274B",
  height: 60,
  margin: 2,
  fontSize: 16,
};
