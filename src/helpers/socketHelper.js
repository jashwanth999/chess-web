import { io } from "socket.io-client";
export const socket = io.connect(
  "https://boiling-headland-42694.herokuapp.com/"
);
