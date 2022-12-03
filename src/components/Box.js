import React from "react";
import "../css/pieces.css";
import { gridConstants, h, v } from "../helpers/imageHelpers";

export default function Box({ number, image, row, col }) {
  if (number % 2 === 0) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "#F5F7D7",
        }}
      >
        {image && (
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              height: gridConstants.gridSize / 8,
              width: gridConstants.gridSize / 8,
            }}
            className="piece"
          />
        )}
      </div>
    );
  } else
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        {image && (
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              height: gridConstants.gridSize / 8,
              width: gridConstants.gridSize / 8,
            }}
            className="piece"
          />
        )}
      </div>
    );
}

const rowNameStyle = {
  color: "black",
  position: "absolute",
  margin: 0,
  fontSize: 12,
};

const colNameStyle = {
  color: "black",
  margin: 0,
  fontSize: 12,
  position: "absolute",
  bottom: "12%",
  marginLeft: 2,
};
