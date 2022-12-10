import React from "react";
import "../css/pieces.css";
import { gridConstants } from "../helpers/imageHelpers";

export default function Box(props) {
  if (props.number % 2 === 0) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor:
            props.pos === props.prevGrabPos || props.pos === props.currentPos
              ? "#F2F05D"
              : "#F5F7D7",
          justifyContent: "center",
          alignItems: "center",
          // border:row===0 && col===4 ?'1.5px solid red' : ""
        }}
      >
        {props.image ? (
          <div
            style={{
              backgroundImage: `url(${props.image})`,
              backgroundSize: "cover",
              height: gridConstants.gridSize / 8,
              width: gridConstants.gridSize / 8,
            }}
            className="piece"
          />
        ) : (
          props.moveTrack &&
          props.moveTrack[props.pos] && (
            <div
              style={{
                height: gridConstants.gridSize / 14,
                width: gridConstants.gridSize / 14,
                borderRadius: gridConstants.gridSize / 14,
                backgroundColor: "grey",
              }}
            />
          )
        )}
      </div>
    );
  } else
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor:
            props.pos === props.prevGrabPos || props.pos === props.currentPos
              ? "#DBC809"
              : "",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.image ? (
          <div
            style={{
              backgroundImage: `url(${props.image})`,
              backgroundSize: "cover",
              height: gridConstants.gridSize / 8,
              width: gridConstants.gridSize / 8,
            }}
            className="piece"
          />
        ) : (
          props.moveTrack &&
          props.moveTrack[props.pos] && (
            <div
              style={{
                height: gridConstants.gridSize / 14,
                width: gridConstants.gridSize / 14,
                borderRadius: gridConstants.gridSize / 14,
                backgroundColor: "grey",
              }}
            />
          )
        )}
      </div>
    );
}
