import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addUsers } from "../api/action";
import { socket } from "../helpers/socketHelper";

export default function WaitingScreen() {
  const [data, setData] = useState([]);
  const { roomid } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const moveToChessScreen = () => {
    navigate(`/room/${roomid}`);
  };

  useEffect(() => {
    socket.emit("get_data_room", { roomid });
    socket.on("recieve_users_to_room", (data) => {
      setData(data);

      if (data.length > 1) {
        data[0] = { username: data[0].username, color: "b" };
        data[1] = { username: data[1].username, color: "w" };

        dispatch(addUsers(data));
        moveToChessScreen();
      }
    });
  }, [data, roomid, dispatch]);

  return (
    <div style={rootDiv}>
      <h3 style={{ color: "white" }}> Searching for opponent...</h3>
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
