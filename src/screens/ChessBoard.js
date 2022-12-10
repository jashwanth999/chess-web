import React, { useEffect, useRef, useState } from "react";
import Box from "../components/Box";
import { socket } from "../helpers/apiHelpers";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOpponentPiecePositionAction,
  changePiecePositionAction,
} from "../api/action";
import ChatBox from "../components/ChatBox";
import { gridConstants, h, v } from "../helpers/imageHelpers";
import {
  changeBackAndForWardPosition,
  dropPiece,
  getTurn,
  grabPiece,
  movePiece,
} from "../helpers/chessBoardHelpers";
import KilledPieceComponent from "../components/KilledPieceComponent";
import PawnReachedOtherSide from "../components/PawnReachedOtherSide";
import CheckMatePopUp from "../components/CheckMatePopUp";
import DetailsComponent from "../components/DetailsComponent";

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

  const [killedPieces, setKilledPieces] = useState([]);

  const [opponentKilledPieces, setOpponentKilledPieces] = useState([]);

  const [myTurn, setMyTurn] = useState(getTurn(users, user));

  const [minutes, setMinutes] = useState(10);

  const [seconds, setSeconds] = useState(0);

  const [opponentMinutes, setOpponentMinutes] = useState(10);

  const [opponentSeconds, setOpponentSeconds] = useState(0);

  const [pawnReachedOtherSideData, setPawnReachedOtherSideData] = useState({});

  const [opponetCalledForCheck, setOpponentCalledForCheck] = useState(false);

  const [checkMatePopupData, setCheckMatePopUpData] = useState();

  const [prevMovePos, setPrevMovePos] = useState();

  const [allPos, setAllPos] = useState([]);

  const [allPosLength, setAllPosLength] = useState(0);

  const chessboardRef = useRef(null);

  const audioRef = useRef();

  console.log(allPos, allPosLength);
  let board = [];

  let timer;

  let opponentTimer;

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
          pos={i.toString() + ":" + j.toString()}
          prevGrabPos={prevMovePos?.grabpos}
          currentPos={prevMovePos?.pos}
        />
      );
    }
  }

  useEffect(() => {
    socket.on("recieve_room_data", (data) => {
      dispatch(changePiecePositionAction(data.pieces));
      dispatch(changeOpponentPiecePositionAction(data.piecesOpponent));
      setData(data);

      setMyTurn(data.turn);

      setKilledPieces(data.killedPieces);

      setOpponentKilledPieces(data.opponentKilledPieces);

      // console.log(data.time)

      setPrevMovePos(data.prevMovePos);

      setMinutes(data.time.minutes);

      setSeconds(data.time.seconds);

      setOpponentMinutes(data.time.opponentMinutes);

      setOpponentSeconds(data.time.opponentSeconds);

      setAllPos((allPos) => [...allPos, data.allPos]);

      setAllPosLength((prev) => prev + 1);
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on("recieve_check_mate_data", (data) => {
      setCheckMatePopUpData(data);
    });
  }, [checkMatePopupData]);

  // console.log(kingPosOp);

  // console.log(myTurn);

  // console.log(users);

  // useEffect(() => {
  //   if (myTurn) {
  //     timer = setInterval(() => {
  //       setSeconds(seconds - 1);

  //       if (seconds === 0) {
  //         setSeconds(59);
  //         setMinutes(minutes - 1);
  //       }
  //     }, 1000);

  //     console.log(timer)

  //     return () => clearInterval(timer);
  //   } else {
  //     opponentTimer = setInterval(() => {
  //       setOpponentSeconds(opponentSeconds - 1);

  //       if (opponentSeconds === 0) {
  //         setOpponentSeconds(59);
  //         setOpponentMinutes(opponentMinutes - 1);
  //       }
  //     }, 1000);

  //     return () => clearInterval(opponentTimer);
  //   }
  // });

  let time = {
    minutes: minutes,
    seconds: seconds,
    opponentMinutes: opponentMinutes,
    opponentSeconds: opponentSeconds,
  };

  const backWard = () => {
    if (allPosLength >= 1) {
      let pos = allPos[allPosLength - 1][1];

      let grabpos = allPos[allPosLength - 1][0];

      console.log(pos, grabpos);

      if (users[0].username === user.username) {
        pieces[grabpos] = pieces[pos];
        pieces[pos] = "";
      } else {
        piecesOpponent[grabpos] = piecesOpponent[pos];
        piecesOpponent[pos] = "";
      }

      setPrevMovePos({
        grabpos: grabpos,
        pos: pos,
      });

      setAllPosLength(allPosLength - 1);

      audioRef.current.play();
    }
  };

  const forWard = () => {
    if (allPosLength < allPos.length) {
      let pos = allPos[allPosLength][1];

      let grabpos = allPos[allPosLength][0];

      console.log(pos, grabpos);

      if (users[0].username === user.username) {
        pieces[pos] = pieces[grabpos];
        pieces[grabpos] = "";
      } else {
        piecesOpponent[pos] = piecesOpponent[grabpos];

        piecesOpponent[grabpos] = "";
      }

      setPrevMovePos({
        grabpos: grabpos,
        pos: pos,
      });

      setAllPosLength(allPosLength + 1);
      audioRef.current.play();
    }
  };

  return (
    <div style={rootDiv}>
      <div>
        <div style={topAndBottomDiv}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ margin: 1, color: "white" }}>
              {users[0].username === user.username
                ? users[1].username
                : users[0].username}
            </h3>
            <KilledPieceComponent
              users={users}
              user={user}
              killedPieces={opponentKilledPieces}
              opponentKilledPieces={killedPieces}
            />
          </div>

          <h3 style={{ margin: 1, color: myTurn ? "white" : "#D35400" }}>
            {" "}
            {opponentMinutes.toString().length < 2
              ? "0" + opponentMinutes
              : opponentMinutes}
            :
            {opponentSeconds.toString().length < 2
              ? "0" + opponentSeconds
              : opponentSeconds}{" "}
          </h3>
        </div>

        <div
          onMouseMove={(e) =>
            movePiece(e, chessboardRef, activePiece, setActivePiece)
          }
          onMouseDown={(e) =>
            grabPiece(
              e,
              chessboardRef,
              setGrabPosition,
              users,
              user,
              pieces,
              piecesOpponent,
              setActivePiece,
              gridConstants,
              myTurn,
              checkMatePopupData,
              allPos,
              allPosLength
            )
          }
          onMouseUp={(e) =>
            dropPiece(
              e,
              chessboardRef,
              activePiece,
              grabPosition,
              users,
              user,
              pieces,
              piecesOpponent,
              audioRef,
              setActivePiece,
              setMyTurn,
              dispatch,
              timer,
              opponentTimer,
              kingPos,
              kingPosOp,
              myTurn,
              killedPieces,
              opponentKilledPieces,
              setKilledPieces,
              setOpponentKilledPieces,
              roomid,
              time,
              setPawnReachedOtherSideData,
              setOpponentCalledForCheck,
              setCheckMatePopUpData,
              setPrevMovePos,
              setAllPos,
              allPos,
              setAllPosLength,
              allPosLength
            )
          }
          // onTouchStart={(e) => grabPiece(e)}
          // onTouchMove={(e) => movePiece(e)}
          // onTouchEnd={(e) => dropPiece(e)}

          ref={chessboardRef}
          style={chessBoardDiv}
        >
          <PawnReachedOtherSide
            pawnReachedOtherSideData={pawnReachedOtherSideData}
            roomid={roomid}
            setPawnReachedOtherSideData={setPawnReachedOtherSideData}
          />
          {board}
        </div>

        <div style={topAndBottomDiv}>
          {" "}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ margin: 1, color: "white" }}> {user?.username} </h3>
            <KilledPieceComponent
              users={users}
              user={user}
              killedPieces={killedPieces}
              opponentKilledPieces={opponentKilledPieces}
            />
          </div>
          <h3 style={{ margin: 1, color: myTurn ? "#D35400" : "white" }}>
            {" "}
            {minutes.toString().length < 2 ? "0" + minutes : minutes}:
            {seconds.toString().length < 2 ? "0" + seconds : seconds}{" "}
          </h3>
        </div>

        <audio src={require("../sounds/piece-move.wav")} ref={audioRef} />

        {checkMatePopupData && (
          <CheckMatePopUp
            checkMatePopupData={checkMatePopupData}
            setCheckMatePopUpData={setCheckMatePopUpData}
            username={user.username}
          />
        )}
      </div>

      <DetailsComponent
        roomid={roomid}
        user={user}
        socket={socket}
        allPos={allPos}
        backWard={backWard}
        forWard={forWard}
      />
    </div>
  );
}

const rootDiv = {
  display: "flex",
  justifyContent: "center",
  minHeight: "100vh",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: "rgba(46, 46, 46,0.9)",
  flexWrap: "wrap",
};
const chessBoardDiv = {
  height: gridConstants.gridSize,
  width: gridConstants.gridSize,
  backgroundColor: "orange",
  borderRadius: 2,
  display: "grid",
  flexWrap: "wrap",
  gridTemplateColumns: `repeat(8,${gridConstants.gridSize / 8}px)`,
  gridTemplateRows: `repeat(8,${gridConstants.gridSize / 8}px)`,
};

const topAndBottomDiv = {
  width: gridConstants.gridSize - 5,
  display: "flex",
  justifyContent: "space-between",
  margin: 5,
  padding: 2,
  height: 40,
};

const rightDiv = {
  margin: 10,
  flexDirection: "column",
  height: gridConstants.gridSize,
  width: gridConstants.gridSize,
  justifyContent: "space-around",
};
