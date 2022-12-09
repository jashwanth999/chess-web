import { socket } from "./socketHelper";

export const messageToSocket = (
  posOp,
  grabposOp,
  users,
  user,
  pieces,
  piecesOpponent,
  kingPos,
  kingPosOp,
  myTurn,
  killedPieces,
  opponentKilledPieces,
  roomid
) => {
  socket.emit("send_data", {
    posOp,
    grabposOp,
    users,
    user,
    pieces,
    piecesOpponent,
    kingPos,
    kingPosOp,
    socket,
    myTurn,
    killedPieces,
    opponentKilledPieces,
    roomid,
  });
};

export const checkMateMessageToSocket = (roomid, winnerName, color) => {
  socket.emit("send_check_mate_data", {
    roomId: roomid,
    winnerName,
    color: color,
  });
};
