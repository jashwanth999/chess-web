import React from "react";
import { gridConstants } from "../helpers/imageHelpers";
import ChatBox from "./ChatBox";
import IconButton from "@mui/material/IconButton";

import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Pause,
  PlayArrow,
} from "@mui/icons-material";

import "../css/chat.css";

export default function DetailsComponent({
  roomid,
  user,
  socket,
  allPos,
  backWard,
  forWard,
  scrollRef,
  totalBackWard,
  totalForward,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="prevpos"
        style={{
          width: gridConstants.gridSize,
          height: gridConstants.gridSize / 9,
          backgroundColor: "rgb(46, 46, 46)",
          marginLeft: 10,
          marginBottom: 2,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          overflowX: "scroll",
        }}
      >
        {allPos.map((pos, index) => {
          return (
            <h4
              key={index}
              ref={scrollRef}
              style={{
                color: "white",
                margin: 2,
                display: "flex",
                flexDirection: "row",
              }}
            >
              {index % 2 === 0 ? Math.ceil((index + 1) / 2) + "." : ""}
              <span
                style={{
                  backgroundColor: index === allPos.length - 1 ? "grey" : "",
                  borderTopLeftRadius: 2,
                  borderBottomLeftRadius: 2,
                  paddingLeft: 2,
                }}
              >
                {String.fromCharCode(97 + Number(pos[1].split(":")[1]))}
              </span>
              <span
                style={{
                  backgroundColor: index === allPos.length - 1 ? "grey" : "",
                  borderTopRightRadius: 2,
                  borderBottomRightRadius: 2,
                  paddingRight: 2,
                }}
              >
                {pos[1].split(":")[0]}
              </span>
            </h4>
          );
        })}
      </div>

      <ChatBox roomId={roomid} username={user.username} socket={socket} />

      <div
        style={{
          width: gridConstants.gridSize,
          height: gridConstants.gridSize / 9,
          backgroundColor: "rgb(46, 46, 46)",
          marginLeft: 10,
          marginTop: 2,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <IconButton onClick={totalBackWard} style={{ color: "lightgray" }}>
          <FirstPage style={icons} />
        </IconButton>
        <IconButton onClick={backWard} style={{ color: "lightgray" }}>
          <ChevronLeft style={icons} />
        </IconButton>
        <IconButton onClick={forWard} style={{ color: "lightgray" }}>
          <ChevronRight style={icons} />
        </IconButton>
        <IconButton onClick={totalForward} style={{ color: "lightgray" }}>
          <LastPage style={icons} />
        </IconButton>
      </div>
    </div>
  );
}

const icons = {
  color: "white",
  fontSize: 35,
  cursor: "pointer",
};
