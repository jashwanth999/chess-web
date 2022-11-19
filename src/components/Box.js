import React from "react";
import "../css/pieces.css";

export default function Box({ number, image, row, col, chessBoard }) {
 
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
              height: 70,
              width: 70,
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
              height: 70,
              width: 70,
            }}
            className="piece"
          />
        )}
      </div>
    );
}
