import { socket } from "./apiHelpers";

export const messageToSocket = (
  roomid,
  users,
  pieces,
  piecesOpponent,
  myTurn,
  killedPieces,
  opponentKilledPieces,
  time,
  prevMovePos,
  allPos,
  allPosOp
) => {
  socket.emit("send_data", {
    roomid,
    users,
    pieces,
    piecesOpponent,
    turn: myTurn,
    killedPieces: killedPieces,
    opponentKilledPieces: opponentKilledPieces,
    time,
    prevMovePos,
    allPos,
    allPosOp,
  });
};

export const checkMateMessageToSocket = (roomid, winnerName, color) => {
  socket.emit("send_check_mate_data", {
    roomId: roomid,
    winnerName,
    color: color,
  });
};
