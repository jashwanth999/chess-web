import React, { useEffect, useRef, useState } from "react";
// import { pieces } from "../helpers/imageHelpers";
import Box from "../components/Box";
import { socket } from "../helpers/socketHelper";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeKingPosition,
  changeOpponentKingPosition,
  changeOpponentPiecePositionAction,
  changePiecePositionAction,
} from "../api/action";
import ChatBox from "../components/ChatBox";
import { messageToSocket } from "../helpers/socketApiHelper";
import {
  isValidMoveForCheckMate,
  pieceValidMethodMap,
} from "../helpers/validHelpers";

const h = [1, 2, 3, 4, 5, 6, 7, 8];
const v = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function ChessBoard() {
  const { roomid } = useParams();

  const pieces = useSelector((state) => state.pieces.pieces);

  const piecesOpponent = useSelector(
    (state) => state.piecesOpponent.piecesOpponent
  );

  const users = useSelector((state) => state.users.users);

  const user = useSelector((state) => state.user.user);

  const kingPos = useSelector((state) => state.kingPos.kingPos);

  const kingPosOp = useSelector((state) => state.kingPosOp.kingPosOp);

  const dispatch = useDispatch();
  const [activePiece, setActivePiece] = useState(null);
  const [grabPosition, setGrabPosition] = useState([-1, -1]);

  const [data, setData] = useState({});

  const chessboardRef = useRef(null);
  let board = [];

  function grabPiece(e) {
    let element = e.target;
    const chessboard = chessboardRef.current;

    if (element.classList.contains("piece")) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / 70);
      const grabY = Math.abs(
        Math.floor((e.clientY - chessboard.offsetTop) / 70)
      );

      setGrabPosition([grabY, grabX]);

      let grabpos = grabY.toString() + ":" + grabX.toString();

      // console.log(grabpos)

      // console.log(users,user.username)

      if (
        users[0].username === user.username &&
        pieces[grabpos].color !== "b"
      ) {
        return;
      } else if (
        users[1].username === user.username &&
        piecesOpponent[grabpos].color !== "w"
      ) {
        return;
      }

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

      // console.log(x, y);

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
    try {
      const chessboard = chessboardRef.current;
      if (activePiece && chessboard) {
        const x = Math.floor((e.clientX - chessboard.offsetLeft) / 70);
        const y = Math.abs(Math.floor((e.clientY - chessboard.offsetTop) / 70));

        // console.log(x, y);

        let pos = y.toString() + ":" + x.toString();

        console.log(pos);

        let posOp = (7 - y).toString() + ":" + (7 - x).toString();

        let grabpos =
          grabPosition[0].toString() + ":" + grabPosition[1].toString();

        let grabposOp =
          (7 - grabPosition[0]).toString() +
          ":" +
          (7 - grabPosition[1]).toString();

        // console.log(grabpos)

        if (
          !pieceValidMethodMap(
            grabPosition[0],
            grabPosition[1],
            y,
            x,
            users[0]?.username === user.username
              ? pieces[grabpos]?.pieceName
              : piecesOpponent[grabpos]?.pieceName,
            users[0]?.username === user.username ? pieces : piecesOpponent
          )
        ) {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        } else if (users[0].username === user.username && pieces[grabpos]) {
          let piecesData = pieces[grabpos];

          let piecesDataOp = piecesOpponent[grabposOp];

          let piecesPosData = pieces[pos];

          let piecesPosDataOp = piecesOpponent[posOp];

          if (
            pieces[pos] &&
            (pieces[pos].color === pieces[grabpos].color ||
              pieces[pos].pieceName === "k")
          ) {
            activePiece.style.position = "relative";
            activePiece.style.removeProperty("top");
            activePiece.style.removeProperty("left");

            setActivePiece(null);

            return;
          }

          let kingFlag = false;

          if (pieces[grabpos].pieceName === "k") {
            kingFlag = true;
            dispatch(changeKingPosition(pos));
          }

          console.log("king", pieces[grabpos].pieceName, kingPos, kingFlag);

          pieces[grabpos] = "";
          pieces[pos] = piecesData;

          piecesOpponent[posOp] = piecesDataOp;
          piecesOpponent[grabposOp] = "";

          if (
            isValidMoveForCheckMate(
              parseInt(kingPos.split(":")[0]),
              parseInt(kingPos.split(":")[1]),
              pieces
            ) &&
            !kingFlag
          ) {
            pieces[grabpos] = piecesData;

            pieces[pos] = piecesPosData;

            piecesOpponent[grabposOp] = piecesDataOp;

            piecesOpponent[posOp] = piecesPosDataOp;

            activePiece.style.position = "relative";
            activePiece.style.removeProperty("top");
            activePiece.style.removeProperty("left");

            setActivePiece(null);

            return;
          }

          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");

          messageToSocket(roomid, pieces, piecesOpponent);
        } else if (
          users[1].username === user.username &&
          piecesOpponent[grabpos]
        ) {
          let piecesData = piecesOpponent[grabpos];

          let piecesDataOp = pieces[grabposOp];

          let piecesPosData = piecesOpponent[pos];

          let piecesPosDataOp = pieces[posOp];

          if (
            piecesOpponent[pos] &&
            (piecesOpponent[pos].color === piecesOpponent[grabpos].color ||
              piecesOpponent[pos].pieceName === "k")
          ) {
            activePiece.style.position = "relative";
            activePiece.style.removeProperty("top");
            activePiece.style.removeProperty("left");

            setActivePiece(null);

            return;
          }

          let kingFlag = false;

          if (piecesOpponent[grabpos].pieceName === "k") {
            kingFlag = true;
            dispatch(changeKingPosition(pos));
          }

          piecesOpponent[grabpos] = "";
          piecesOpponent[pos] = piecesData;

          pieces[posOp] = piecesDataOp;
          pieces[grabposOp] = "";

          console.log("king", grabpos, piecesOpponent[grabpos]);

          if (
            isValidMoveForCheckMate(
              Number(kingPos.split(":")[0]),
              Number(kingPos.split(":")[1]),
              piecesOpponent
            ) &&
            !kingFlag
          ) {
            piecesOpponent[grabpos] = piecesData;

            piecesOpponent[pos] = piecesPosData;

            pieces[grabposOp] = piecesDataOp;

            pieces[posOp] = piecesPosDataOp;

            activePiece.style.position = "relative";
            activePiece.style.removeProperty("top");
            activePiece.style.removeProperty("left");

            setActivePiece(null);

            return;
          }

          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");

          messageToSocket(roomid, pieces, piecesOpponent);
        }

        setActivePiece(null);
      }
    } catch (e) {
      console.log("Error while drop piece : ", e.message);
    }
  }

  for (let i = 0; i < h.length; i++) {
    for (let j = 0; j < v.length; j++) {
      const number = j + i + 2;

      let cord = i.toString() + ":" + j.toString();

      board.push(
        <Box
          image={
            users[0]?.username === user.username
              ? pieces[cord]?.image
              : piecesOpponent[cord]?.image
          }
          number={number}
        />
      );
    }
  }

  useEffect(() => {
    socket.on("recieve_room_data", (data) => {
      dispatch(changePiecePositionAction(data.pieces));
      dispatch(changeOpponentPiecePositionAction(data.piecesOpponent));
      setData(data);
    });
  }, [dispatch, pieces, data, piecesOpponent, users, user]);

  // console.log(kingPos);

  return (
    <div style={rootDiv}>
      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        ref={chessboardRef}
        style={chessBoardDiv}
      >
        {board}
      </div>

      {/* <div style={rightDiv}>
        <h3 style={{ color: "white", margin: 0 }}>
          {" "}
          {user.username === users[0].username
            ? users[1].username
            : users[0].username}
        </h3>

        <ChatBox roomId={roomid} username={user.username} socket={socket} />
        <h3 style={{ color: "white", margin: 0 }}> {user.username}</h3>
      </div> */}
    </div>
  );
}

const rootDiv = {
  display: "flex",
  justifyContent: "space-around",
  height: "100vh",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: "#34495E",
};
const chessBoardDiv = {
  height: 560,
  width: 560,
  backgroundColor: "orange",
  display: "grid",
  flexWrap: "wrap",
  gridTemplateColumns: "repeat(8,70px)",
  gridTemplateRows: "repeat(8,70px)",
};

const rightDiv = {
  display: "flex",
  flex: 0.7,
  margin: 10,
  flexDirection: "column",
  height: "100vh",
  justifyContent: "space-around",
};
