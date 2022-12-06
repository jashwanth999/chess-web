import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, addUsers } from "../api/action";
import { socket } from "../helpers/socketHelper";

export default function WaitingScreen() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("recieve_room_users", (data) => {
      setData(data);

      // console.log(data);

      dispatch(addUsers(data));

     

      navigate(`/room/${data[0].roomId}`);
    });
  }, [dispatch]);

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
