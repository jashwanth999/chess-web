import { socket } from "./socketHelper";

export const messageToSocket = (roomid, pieces, piecesOpponent) => {
  socket.emit("send_data", {
    roomid,
    pieces,
    piecesOpponent,
  });
};
