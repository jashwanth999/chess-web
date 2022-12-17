import React, { useEffect, useRef, useState } from "react";
import Box from "../components/Box";
import { socket, url } from "../helpers/apiHelpers";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  addUsers,
  changeOpponentPiecePositionAction,
  changePiecePositionAction,
  resetOpponentPieces,
  resetPiece,
} from "../api/action";
import {
  gridConstants,
  h,
  initialPieces,
  initialPiecesOpponent,
  p,
  po,
  tempInitialPieces,
  tempInitialPiecesOpponent,
  v,
} from "../helpers/imageHelpers";
import {
  dropPiece,
  getTurn,
  grabPiece,
  movePiece,
} from "../helpers/chessBoardHelpers";
import KilledPieceComponent from "../components/KilledPieceComponent";
import PawnReachedOtherSide from "../components/PawnReachedOtherSide";
import CheckMatePopUp from "../components/CheckMatePopUp";
import DetailsComponent from "../components/DetailsComponent";
import axios from "axios";
import { ArrowBack, ChevronLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ChessBoard() {
  const { roomid } = useParams();

  const _id = localStorage.getItem("_id");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const pieces = useSelector((state) => state.pieces.pieces);

  const piecesOpponent = useSelector(
    (state) => state.piecesOpponent.piecesOpponent
  );

  const users = useSelector((state) => state.users.users);

  const user = useSelector((state) => state.user.user);

  const kingPos = useSelector((state) => state.kingPos.kingPos);

  const kingPosOp = useSelector((state) => state.kingPosOp.kingPosOp);

  const [activePiece, setActivePiece] = useState(null);

  const [grabPosition, setGrabPosition] = useState([-1, -1]);

  const [killedPieces, setKilledPieces] = useState([]);

  const [opponentKilledPieces, setOpponentKilledPieces] = useState([]);

  const [myTurn, setMyTurn] = useState(getTurn(users, user));

  const [minutes, setMinutes] = useState(10);

  const [seconds, setSeconds] = useState(0);

  const [opponentMinutes, setOpponentMinutes] = useState(10);

  const [opponentSeconds, setOpponentSeconds] = useState(0);

  const [pawnReachedOtherSideData, setPawnReachedOtherSideData] = useState({});

  const [opponetCalledForCheck, setOpponentCalledForCheck] = useState({});

  const [checkMatePopupData, setCheckMatePopUpData] = useState();

  const [prevMovePos, setPrevMovePos] = useState();

  const [allPos, setAllPos] = useState([]);

  const [allPosOp, setAllPosOp] = useState([]);

  const [allPosLength, setAllPosLength] = useState(0);

  const chessboardRef = useRef(null);

  const [moveTrack, setMoveTrack] = useState({});

  const audioRef = useRef();

  const scrollRef = useRef();

  let board = [];

  for (let i = 0; i < h.length; i++) {
    for (let j = 0; j < v.length; j++) {
      const number = j + i + 2;

      let cord = i.toString() + ":" + j.toString();

      board.push(
        <Box
          key={cord}
          image={
            users[0]?.username === user?.username
              ? pieces[cord]?.image
              : piecesOpponent[cord]?.image
          }
          number={number}
          pos={i.toString() + ":" + j.toString()}
          prevGrabPos={prevMovePos?.grabpos}
          currentPos={prevMovePos?.pos}
          moveTrack={moveTrack}
        />
      );
    }
  }

  useEffect(() => {
    socket.on("recieve_room_data", (data) => {
      dispatch(changePiecePositionAction(data.pieces));
      dispatch(changeOpponentPiecePositionAction(data.piecesOpponent));

      setMyTurn(data.turn);

      setKilledPieces(data.killedPieces);

      setOpponentKilledPieces(data.opponentKilledPieces);

      // console.log(data.time)

      setPrevMovePos(data.prevMovePos);
      
      setMinutes(data.time.opponentMinutes);

      setSeconds(data.time.opponentSeconds);

      setOpponentMinutes(data.time.minutes);

      setOpponentSeconds(data.time.seconds);

      setAllPos(data.allPos);

      setAllPosOp(data.allPosOp);

      setAllPosLength(data.allPos.length);
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchRoomData = async () => {
      const roomResponse = await axios.post(`${url}/get-room-data`, {
        roomId: roomid,
      });

      if (roomResponse.data.data) {
        const _id = localStorage.getItem("_id");

        const response = await axios.post(`${url}/get-user`, {
          _id,
        });

        const userData = response.data;

        dispatch(addUser(userData.user));

        socket.emit("reconnection", { roomId: roomid });

        const data = roomResponse.data.data;

        dispatch(changePiecePositionAction(data.pieces));

        dispatch(changeOpponentPiecePositionAction(data.piecesOpponent));

        dispatch(addUsers(data.users));

        setMyTurn(data.turn);

        setKilledPieces(data.killedPieces);

        setOpponentKilledPieces(data?.opponentKilledPieces);

        setPrevMovePos(data?.prevMovePos);

        setMinutes(data.time.minutes);

        setSeconds(data.time.seconds);

        setOpponentMinutes(data.time.opponentMinutes);

        setOpponentSeconds(data.time.opponentSeconds);

        setAllPos(data.allPos);

        setAllPosOp(data.allPosOp);

        setPrevMovePos(data.prevMovePos);

        setAllPosLength(data.allPos.length);
      }
    };

    fetchRoomData();
  }, [dispatch, roomid]);

  useEffect(() => {
    socket.on("recieve_check_mate_data", (data) => {
      setCheckMatePopUpData(data);
    });
  }, [checkMatePopupData]);

  useEffect(() => {
    const updateUser = async () => {
      await axios.post(`${url}/update-user`, {
        _id: _id,
        isInGame: true,
        roomId: roomid,
      });
    };

    updateUser();
  }, [_id, roomid]);

  // console.log(kingPosOp);

  // console.log(myTurn);

  // console.log(users);

  useEffect(() => {
    if (myTurn) {
      let timer = setInterval(() => {
        setSeconds(seconds - 1);

        if (seconds === 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }, 1000);

      return () => clearInterval(timer);
    } else {
      let opponentTimer = setInterval(() => {
        setOpponentSeconds(opponentSeconds - 1);

        if (opponentSeconds === 0) {
          setOpponentSeconds(59);
          setOpponentMinutes(opponentMinutes - 1);
        }
      }, 1000);

      return () => clearInterval(opponentTimer);
    }
  });

  let time = {
    minutes: minutes,
    seconds: seconds,
    opponentMinutes: opponentMinutes,
    opponentSeconds: opponentSeconds,
  };

  const totalForward = () => {
    if (users[0]?.username === user?.username) {
      let pos, grabpos;
      for (let i = allPosLength; i < allPos.length; i++) {
        pos = allPos[i][1];

        grabpos = allPos[i][0];

        pieces[pos] = pieces[grabpos];
        pieces[grabpos] = "";
      }

      setPrevMovePos({
        grabpos: grabpos,
        pos: pos,
      });

      setAllPosLength(allPos.length);
    } else {
      let pos, grabpos;
      for (let i = allPosLength; i < allPosOp.length; i++) {
        pos = allPosOp[i][1];

        grabpos = allPosOp[i][0];
        piecesOpponent[pos] = piecesOpponent[grabpos];

        piecesOpponent[grabpos] = "";
      }

      setPrevMovePos({
        grabpos: grabpos,
        pos: pos,
      });

      setAllPosLength(allPosOp.length);
    }
  };

  const totalBackWard = () => {
    if (users[0]?.username === user?.username) {
      let pos, grabpos;
      for (let i = allPosLength; i >= 1; i--) {
        pos = allPos[i - 1][1];

        grabpos = allPos[i - 1][0];
        pieces[grabpos] = pieces[pos];
        pieces[pos] =
          allPos && allPos[i - 1] && allPos[i - 1][2] ? allPos[i - 1][2] : "";
      }

      setPrevMovePos({
        grabpos: grabpos,
        pos: pos,
      });

      setAllPosLength(0);
    } else {
      let pos, grabpos;
      for (let i = allPosLength; i >= 1; i--) {
        pos = allPosOp[i - 1][1];

        grabpos = allPosOp[i - 1][0];
        piecesOpponent[grabpos] = piecesOpponent[pos];
        piecesOpponent[pos] =
          allPosOp && allPosOp[i - 1] && allPosOp[i - 1][2]
            ? allPosOp[i - 1][2]
            : "";
      }

      setPrevMovePos({
        grabpos: grabpos,
        pos: pos,
      });

      setAllPosLength(0);
    }
  };

  const backWard = () => {
    if (allPosLength >= 1) {
      let pos, grabpos;
      if (users[0]?.username === user?.username) {
        pos = allPos[allPosLength - 1][1];

        grabpos = allPos[allPosLength - 1][0];
        pieces[grabpos] = pieces[pos];
        pieces[pos] =
          allPos && allPos[allPosLength - 1] && allPos[allPosLength - 1][2]
            ? allPos[allPosLength - 1][2]
            : "";
      } else {
        pos = allPosOp[allPosLength - 1][1];

        grabpos = allPosOp[allPosLength - 1][0];
        piecesOpponent[grabpos] = piecesOpponent[pos];
        piecesOpponent[pos] =
          allPosOp &&
          allPosOp[allPosLength - 1] &&
          allPosOp[allPosLength - 1][2]
            ? allPosOp[allPosLength - 1][2]
            : "";
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
    if (allPosLength < allPos.length || allPosLength < allPosOp.length) {
      let pos, grabpos;

      if (users[0]?.username === user?.username) {
        pos = allPos[allPosLength][1];

        grabpos = allPos[allPosLength][0];

        pieces[pos] = pieces[grabpos];
        pieces[grabpos] = "";
      } else {
        pos = allPosOp[allPosLength][1];

        grabpos = allPosOp[allPosLength][0];
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

  const exitRoom = async () => {
    await axios.post(`${url}/update-user`, {
      _id: _id,
      isInGame: false,
      roomId: roomid,
    });

    socket.emit("leave_room", { roomId: roomid });

    dispatch(resetPiece(initialPieces));
    dispatch(resetOpponentPieces(initialPiecesOpponent));

    navigate("/home");

    window.location.reload();
  };

  return (
    <div style={rootDiv}>
      <div>
        <IconButton
          onClick={exitRoom}
          style={{ top: 10, left: 10, position: "absolute", color: "white" }}
        >
          <ArrowBack style={{ color: "white" }} />
        </IconButton>
        <div style={topAndBottomDiv}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ margin: 1, color: "white" }}>
              {users[0]?.username === user?.username
                ? users[1]?.username
                : users[0]?.username}
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
              setMoveTrack
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
              allPosLength,
              setMoveTrack,
              allPosOp,
              setAllPosOp
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
            username={user?.username}
          />
        )}
      </div>

      <DetailsComponent
        roomid={roomid}
        user={user}
        socket={socket}
        allPos={users[0]?.username === user?.username ? allPos : allPosOp}
        backWard={backWard}
        forWard={forWard}
        scrollRef={scrollRef}
        totalBackWard={totalBackWard}
        totalForward={totalForward}
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
