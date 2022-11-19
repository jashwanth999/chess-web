import React, { useRef, useState } from "react";
import { pieces } from "../helpers/imageHelpers";
import Box from "./Box";

const h = [1, 2, 3, 4, 5, 6, 7, 8];
const v = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function ChessBoard() {
  const [activePiece, setActivePiece] = useState(null);
  const [grabPosition, setGrabPosition] = useState([-1, -1]);

  const chessboardRef = useRef(null);
  let board = [];

  function grabPiece(e) {
    let element = e.target;
    const chessboard = chessboardRef.current;

    if (element.classList.contains("piece")) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / 70);
      const grabY = Math.abs(Math.floor(e.clientY / 70));
      // console.log(grabY, grabX);
      setGrabPosition([grabY, grabX]);

      const x = e.clientX - 70 / 2;
      const y = e.clientY - 70 / 2;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  function movePiece(e) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft;
      const minY = chessboard.offsetTop;

      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 50;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 65;

      const x = e.clientX - 40;
      const y = e.clientY - 40;
      activePiece.style.position = "absolute";

      console.log(x, y);

      //If x is smaller than minimum amount
      if (x < minX) {
        activePiece.style.position = "absolute";
        activePiece.style.left = `${minX}px`;
      }
      //If x is bigger than maximum amount
      else if (x > maxX) {
        activePiece.style.position = "absolute";
        activePiece.style.top = `${maxX}px`;

        //   dropPiece(e);
      }
      //If x is in the constraints
      else {
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`;
      }

      //If y is smaller than minimum amount
      if (y < minY) {
        activePiece.style.position = "absolute";
        activePiece.style.top = `${minY}px`;
      }
      //If y is bigger than maximum amount
      else if (y > maxY) {
        activePiece.style.position = "absolute";
        activePiece.style.top = `${maxY}px`;
      }
      //If y is in the constraints
      else {
        activePiece.style.position = "absolute";
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 70);
      const y = Math.abs(Math.floor(e.clientY / 70));

      console.log(x, y);

      let pos = y.toString() + ":" + x.toString();

      // console.log(grabPosition);

      let grabpos =
        grabPosition[0].toString() + ":" + grabPosition[1].toString();

      // console.log(grabpos);

      if (pieces[pos]) {
        activePiece.style.position = "relative";
        activePiece.style.removeProperty("top");
        activePiece.style.removeProperty("left");
      } else if (pieces[grabpos]) {
        let img = pieces[grabpos];

        pieces[grabpos] = "";

        activePiece.style.position = "relative";
        activePiece.style.removeProperty("top");
        activePiece.style.removeProperty("left");

        pieces[pos] = img;
      }
      // console.log(pos, pieces[pos]);
      setActivePiece(null);
    }
  }

  for (let i = 0; i < h.length; i++) {
    for (let j = 0; j < v.length; j++) {
      const number = j + i + 2;

      let cord = i.toString() + ":" + j.toString();

      board.push(
        <Box
          image={pieces[cord]}
          number={number}
          row={i}
          col={j}
          chessBoard={chessboardRef.current}
        />
      );
    }
  }

  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessboardRef}
      style={chessBoardDiv}
    >
      {board}
    </div>
  );
}

const chessBoardDiv = {
  height: 560,
  width: 560,
  backgroundColor: "orange",
  display: "grid",
  flexWrap: "wrap",
  gridTemplateColumns: "repeat(8,70px)",
  gridTemplateRows: "repeat(8,70px)",
};
