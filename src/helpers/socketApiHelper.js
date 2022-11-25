import { socket } from "./socketHelper";

export const messageToSocket = (
  roomid,
  pos,
  piecesData,
  grabpos,
  piecesDataOp,
  posOp,
  grabposOp
) => {
  socket.emit("send_data", {
    roomid,
    pos,
    piecesData,
    grabpos,
    piecesDataOp,
    posOp,
    grabposOp,
  });
};
