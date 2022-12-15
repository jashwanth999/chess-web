import { changeKingPosition, changeOpponentKingPosition } from "../api/action";
import { callingOpponentForCheckMate } from "./checkMateAttackHelpers";
import {
  checkMateStopFromOTherPiece,
  kingAbleToMoveAfterCheckMate,
} from "./finalCheckMateAttackHelpers";
import { gridConstants } from "./imageHelpers";
import { moveTrackerMap } from "./moveTrackerHelper";
import { checkMateMessageToSocket, messageToSocket } from "./socketApiHelper";
import { isValidMoveForCheckMate, pieceValidMethodMap } from "./validHelpers";

export const grabPiece = (
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
) => {
  if (myTurn && !checkMatePopupData) {
    try {
      let element = e.target;

      const chessboard = chessboardRef.current;

      if (element.classList.contains("piece")) {
        const grabX = Math.floor(
          (e.clientX - chessboard.offsetLeft) / (gridConstants.gridSize / 8)
        );
        const grabY = Math.abs(
          Math.floor(
            (e.clientY - chessboard.offsetTop) / (gridConstants.gridSize / 8)
          )
        );

        let grabpos = grabY.toString() + ":" + grabX.toString();

        if (
          users[0]?.username === user?.username &&
          pieces[grabpos]?.color !== "b"
        ) {
          return;
        } else if (
          users[1]?.username === user?.username &&
          piecesOpponent[grabpos]?.color !== "w"
        ) {
          return;
        }

        setGrabPosition([grabY, grabX]);

        setMoveTrack(
          moveTrackerMap(
            grabY,
            grabX,
            users[0].username === user.username
              ? pieces[grabpos].pieceName
              : piecesOpponent[grabpos].pieceName,
            users[0].username === user.username ? pieces : piecesOpponent
          )
        );

        const x = e.clientX - gridConstants.gridSize / 8 / 2;
        const y = e.clientY - gridConstants.gridSize / 8 / 2;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        setActivePiece(element);
      }
    } catch (e) {
      console.log("Error while grabbing piece", e.message);
    }
  }
};

export const movePiece = (e, chessboardRef, activePiece, setActivePiece) => {
  const chessboard = chessboardRef.current;
  if (activePiece && chessboard) {
    const minX = chessboard.offsetLeft;
    const minY = chessboard.offsetTop;

    const maxX = chessboard.offsetLeft + chessboard.clientWidth - 56;
    const maxY = chessboard.offsetTop + chessboard.clientHeight - 56;

    // console.log(chessboard.offsetLeft, chessboard.clientWidth);

    const x = e.clientX - 40;
    const y = e.clientY - 40;
    activePiece.style.position = "absolute";
    activePiece.style.left = `${x}px`;
    activePiece.style.top = `${y}px`;

    // console.log(x, y);

    // If x is smaller than minimum amount
    //   if (x < minX) {
    //     activePiece.style.position = "absolute";
    //     activePiece.style.left = `${minX}px`;
    //   }
    //   //If x is bigger than maximum amount
    //   else if (x > maxX) {
    //     activePiece.style.position = "absolute";
    //     activePiece.style.left = `${maxX}px`;
    //   }
    //   //If x is in the constraints
    //   else {
    //     activePiece.style.position = "absolute";
    //     activePiece.style.left = `${x}px`;
    //   }

    //   //If y is smaller than minimum amount
    //   if (y < minY) {
    //     activePiece.style.position = "absolute";
    //     activePiece.style.top = `${minY}px`;
    //   }
    //   //If y is bigger than maximum amount
    //   else if (y > maxY) {
    //     activePiece.style.position = "absolute";
    //     activePiece.style.top = `${maxY}px`;
    //   }
    //   //If y is in the constraints
    //   else {
    //     activePiece.style.position = "absolute";
    //     activePiece.style.top = `${y}px`;
    //   }
  }
};
export const dropPiece = (
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
) => {
  try {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor(
        (e.clientX - chessboard.offsetLeft) / (gridConstants.gridSize / 8)
      );
      const y = Math.abs(
        Math.floor(
          (e.clientY - chessboard.offsetTop) / (gridConstants.gridSize / 8)
        )
      );

      let pos = y.toString() + ":" + x.toString();

      // console.log(pos);

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
        ) ||
        allPos.length !== allPosLength
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
          setMoveTrack();

          return;
        }

        let kingFlag = false;

        if (pieces[grabpos].pieceName === "k") {
          kingFlag = true;
          dispatch(changeKingPosition(pos));
        }
        let killedPiecesData;

        if (pieces[pos]) {
          killedPiecesData = pieces[pos];
        }

        pieces[grabpos] = "";
        pieces[pos] = piecesData;

        piecesOpponent[posOp] = piecesDataOp;
        piecesOpponent[grabposOp] = "";

        if (
          isValidMoveForCheckMate(
            kingFlag
              ? Number(pos.split(":")[0])
              : Number(kingPos.split(":")[0]),
            kingFlag
              ? Number(pos.split(":")[1])
              : Number(kingPos.split(":")[1]),
            pieces
          )
        ) {
          pieces[grabpos] = piecesData;

          pieces[pos] = piecesPosData;

          piecesOpponent[grabposOp] = piecesDataOp;

          piecesOpponent[posOp] = piecesPosDataOp;

          if (kingFlag) {
            dispatch(changeKingPosition(grabpos));
          }

          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");

          setActivePiece(null);
          setMoveTrack();

          return;
        }

        //after success ,  checking our move for checkmate

        if (
          callingOpponentForCheckMate(
            7 - Number(kingPosOp.split(":")[0]),
            7 - Number(kingPosOp.split(":")[1]),
            y,
            x,
            pieces[pos].pieceName,
            pieces
          ) &&
          pieces[pos].pieceName !== "k"
        ) {
          console.log("check called by opponent");

          setOpponentCalledForCheck(true);

          let checkMateCount = isValidMoveForCheckMate(
            7 - Number(kingPosOp.split(":")[0]),
            7 - Number(kingPosOp.split(":")[1]),
            pieces
          );

          console.log("checkMateCount", checkMateCount);

          if (checkMateCount > 1) {
            if (
              !kingAbleToMoveAfterCheckMate(
                7 - Number(kingPosOp.split(":")[0]),
                7 - Number(kingPosOp.split(":")[1]),
                pieces
              )
            ) {
              setCheckMatePopUpData({
                roomId: roomid,
                winnerName: users[0].username,
                color: "b",
              });

              checkMateMessageToSocket(roomid, users[0].username, "b");
            }
          } else if (
            !checkMateStopFromOTherPiece(
              pieces,
              7 - Number(kingPosOp.split(":")[0]),
              7 - Number(kingPosOp.split(":")[1]),
              y,
              x
            ) &&
            !kingAbleToMoveAfterCheckMate(
              7 - Number(kingPosOp.split(":")[0]),
              7 - Number(kingPosOp.split(":")[1]),
              pieces
            )
          ) {
            setCheckMatePopUpData({
              roomId: roomid,
              winnerName: users[0].username,
              color: "b",
            });

            checkMateMessageToSocket(roomid, users[0].username, "b");
          }
        } else setOpponentCalledForCheck(false);

        activePiece.style.position = "relative";
        activePiece.style.removeProperty("top");
        activePiece.style.removeProperty("left");

        if (grabpos === pos) {
          setMyTurn(true);
        } else {
          setMyTurn(false);
        }

        if (killedPiecesData) {
          setKilledPieces([...killedPieces, killedPiecesData]);
        }
        audioRef.current.play();

        if (y === 0 && pieces[pos] && pieces[pos].pieceName === "p") {
          setPawnReachedOtherSideData({
            open: true,
            pieces,
            piecesOpponent,
            pos: pos,
            posOp: posOp,
            roomid,
            myTurn,
            killedPieces,
            opponentKilledPieces,
            time,
            opponent: false,
          });
        }

        setPrevMovePos({
          grabpos: grabpos,
          pos: pos,
        });

        let prevMovePos = {
          grabpos: grabposOp,
          pos: posOp,
        };

        setAllPos([...allPos, [grabpos, pos, killedPiecesData]]);

        // setAllPosOp([...allPosOp, [grabpos, pos]]);

        setAllPosLength(allPosLength + 1);

        messageToSocket(
          roomid,
          users,
          pieces,
          piecesOpponent,
          myTurn,
          killedPiecesData ? [...killedPieces, killedPiecesData] : killedPieces,
          opponentKilledPieces,
          time,
          prevMovePos,
          [...allPos, [grabpos, pos, killedPiecesData]],
          [...allPosOp, [grabposOp, posOp, killedPiecesData]]
        );
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

          setMoveTrack();

          return;
        }

        let kingFlag = false;

        if (piecesOpponent[grabpos].pieceName === "k") {
          kingFlag = true;
          dispatch(changeOpponentKingPosition(pos));
        }

        let killedPiecesOpponentData;

        if (piecesOpponent[pos]) {
          killedPiecesOpponentData = piecesOpponent[pos];
        }

        piecesOpponent[grabpos] = "";
        piecesOpponent[pos] = piecesData;

        pieces[posOp] = piecesDataOp;
        pieces[grabposOp] = "";

        if (
          isValidMoveForCheckMate(
            kingFlag
              ? Number(pos.split(":")[0])
              : Number(kingPosOp.split(":")[0]),
            kingFlag
              ? Number(pos.split(":")[1])
              : Number(kingPosOp.split(":")[1]),
            piecesOpponent
          )
        ) {
          piecesOpponent[grabpos] = piecesData;

          piecesOpponent[pos] = piecesPosData;

          pieces[grabposOp] = piecesDataOp;

          pieces[posOp] = piecesPosDataOp;

          if (kingFlag) {
            dispatch(changeOpponentKingPosition(grabpos));
          }

          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");

          setActivePiece(null);
          setMoveTrack();

          return;
        }

        //after success checking our move for checkmate

        if (
          callingOpponentForCheckMate(
            7 - Number(kingPos.split(":")[0]),
            7 - Number(kingPos.split(":")[1]),
            y,
            x,
            piecesOpponent[pos].pieceName,
            piecesOpponent
          ) &&
          piecesOpponent[pos].pieceName !== "k"
        ) {
          console.log("check called by opponent");

          setOpponentCalledForCheck(true);

          let checkMateCount = isValidMoveForCheckMate(
            7 - Number(kingPos.split(":")[0]),
            Number(kingPos.split(":")[1]),
            piecesOpponent
          );

          console.log("checkMateCount", checkMateCount);

          if (checkMateCount > 1) {
            if (
              !kingAbleToMoveAfterCheckMate(
                7 - Number(kingPos.split(":")[0]),
                7 - Number(kingPos.split(":")[1]),
                piecesOpponent
              )
            ) {
              setCheckMatePopUpData({
                roomId: roomid,
                winnerName: users[1].username,
                color: "w",
              });

              checkMateMessageToSocket(roomid, users[1].username, "w");
            }
          } else if (
            !checkMateStopFromOTherPiece(
              piecesOpponent,
              7 - Number(kingPos.split(":")[0]),
              7 - Number(kingPos.split(":")[1]),
              y,
              x
            ) &&
            !kingAbleToMoveAfterCheckMate(
              7 - Number(kingPos.split(":")[0]),
              7 - Number(kingPos.split(":")[1]),
              piecesOpponent
            )
          ) {
            setCheckMatePopUpData({
              roomId: roomid,
              winnerName: users[1].username,
              color: "w",
            });

            checkMateMessageToSocket(roomid, users[1].username, "w");
          }
        } else setOpponentCalledForCheck(false);

        activePiece.style.position = "relative";
        activePiece.style.removeProperty("top");
        activePiece.style.removeProperty("left");

        if (grabpos === pos) {
          setMyTurn(true);
        } else {
          setMyTurn(false);
        }
        if (killedPiecesOpponentData) {
          setOpponentKilledPieces([
            ...opponentKilledPieces,
            killedPiecesOpponentData,
          ]);
        }

        audioRef.current.play();

        if (
          y === 0 &&
          piecesOpponent[pos] &&
          piecesOpponent[pos].pieceName === "p"
        ) {
          setPawnReachedOtherSideData({
            open: true,
            pieces: pieces,
            piecesOpponent: piecesOpponent,
            pos: posOp,
            posOp: pos,
            roomid,
            myTurn,
            killedPieces,
            opponentKilledPieces,
            time,
            opponent: true,
          });
        }

        setPrevMovePos({
          grabpos: grabpos,
          pos: pos,
        });

        let prevMovePos = {
          grabpos: grabposOp,
          pos: posOp,
        };

        // setAllPos([...allPos, [grabpos, pos]]);

        setAllPosOp([...allPosOp, [grabpos, pos, killedPiecesOpponentData]]);

        setAllPosLength(allPosLength + 1);
        messageToSocket(
          roomid,
          users,
          pieces,
          piecesOpponent,
          myTurn,
          killedPieces,
          killedPiecesOpponentData
            ? [...opponentKilledPieces, killedPiecesOpponentData]
            : opponentKilledPieces,
          time,
          prevMovePos,
          [...allPos, [grabposOp, posOp, killedPiecesOpponentData]],
          [...allPosOp, [grabpos, pos, killedPiecesOpponentData]]
        );
      }

      setActivePiece(null);

      setMoveTrack();
    }
  } catch (e) {
    console.log("Error while drop piece : ", e.message);
  }
};

export const changePawnRechedOtherSizeData = (
  pawnReachedOtherSideData,
  setPawnReachedOtherSideData
) => {
  pawnReachedOtherSideData.pieces[pawnReachedOtherSideData.pos] =
    pawnReachedOtherSideData.newPieceData;
  pawnReachedOtherSideData.piecesOpponent[pawnReachedOtherSideData.posOp] =
    pawnReachedOtherSideData.newPieceData;

  messageToSocket(
    pawnReachedOtherSideData.roomid,
    pawnReachedOtherSideData.pieces,
    pawnReachedOtherSideData.piecesOpponent,
    pawnReachedOtherSideData.myTurn,
    pawnReachedOtherSideData.killedPieces,
    pawnReachedOtherSideData.opponentKilledPieces,
    pawnReachedOtherSideData.time
  );

  setPawnReachedOtherSideData({});
};

export const getTurn = (users, user) => {
  if (users[0]?.username === user?.username) {
    if (users[0]?.color === "w") return true;
  }

  if (users[1]?.username === user?.username) {
    if (users[1]?.color === "w") return true;
  }

  return false;
};

export const movePosTracker = (x, y, pieces) => {
  let allMoveTracker = {};
  // up
  for (let i = x - 1; i >= 0; i--) {
    let pos = i.toString() + ":" + y.toString();

    if (pieces[pos]) {
      break;
    }
    allMoveTracker[pos] = true;
  }

  // down
  for (let i = x + 1; i < 8; i++) {
    let pos = i.toString() + ":" + y.toString();

    if (pieces[pos]) {
      break;
    }
    allMoveTracker[pos] = true;
  }

  // left
  for (let i = y - 1; i >= 0; i--) {
    let pos = x.toString() + ":" + i.toString();

    if (pieces[pos]) {
      break;
    }
    allMoveTracker[pos] = true;
  }

  // right
  for (let i = y + 1; i < 8; i++) {
    let pos = x.toString() + ":" + i.toString();

    if (pieces[pos]) {
      break;
    }
    allMoveTracker[pos] = true;
  }

  // left up
  for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
    let pos = i.toString() + ":" + j.toString();

    if (pieces[pos]) {
      break;
    }
    allMoveTracker[pos] = true;
  }

  // left down
  for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
    let pos = i.toString() + ":" + j.toString();

    if (pieces[pos]) {
      break;
    }
    allMoveTracker[pos] = true;
  }

  // right up
  for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
    let pos = i.toString() + ":" + j.toString();

    if (pieces[pos]) {
      break;
    }
    allMoveTracker[pos] = true;
  }

  // right down
  for (let i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
    let pos = i.toString() + ":" + j.toString();

    if (pieces[pos]) {
      break;
    }
    allMoveTracker[pos] = true;
  }

  return allMoveTracker;
};
