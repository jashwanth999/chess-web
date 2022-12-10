import { socket } from "./apiHelpers";

export const messageToSocket = (
  roomid,
  pieces,
  piecesOpponent,
  myTurn,
  killedPieces,
  opponentKilledPieces,
  time,
  prevMovePos,
  allPos
) => {
  socket.emit("send_data", {
    roomid,
    pieces,
    piecesOpponent,
    turn: myTurn,
    killedPieces: killedPieces,
    opponentKilledPieces: opponentKilledPieces,
    time,
    prevMovePos,
    allPos,
  });
};

export const checkMateMessageToSocket = (roomid, winnerName, color) => {
  socket.emit("send_check_mate_data", {
    roomId: roomid,
    winnerName,
    color: color,
  });
};
