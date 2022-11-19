import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import "../css/pieces.css";

export default function Box({ number, image, row, col, chessBoard }) {
  const [dropX, setDropX] = useState(0);
  const [dropY, setDropY] = useState(0);

  const [piecePos, setPiecePos] = useState({ x: 0, y: 0 });
  const pos = useSpring({ x: 0, y: 0 });


  const bind = useDrag((params) => {
    pos.x.set(params.offset[0]);
    pos.y.set(params.offset[1]);

    console.log(chessBoard.current.offsetTop, chessBoard.current.offsetLeft);

    // console.log(row);

    // console.log(
    //   Math.floor(params.offset[0] / 70) + row,
    //   Math.floor(params.offset[1] / 70) + col
    // );
  });

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
