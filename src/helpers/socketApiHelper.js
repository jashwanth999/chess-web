import { socket } from "./socketHelper";

export const messageToSocket = (
  roomid,
  pieces,
  piecesOpponent,
  myTurn,
  killedPieces,
  opponentKilledPieces,
  time
) => {
  socket.emit("send_data", {
    roomid,
    pieces,
    piecesOpponent,
    turn: myTurn,
    killedPieces: killedPieces,
    opponentKilledPieces: opponentKilledPieces,
    time,
  });
};
