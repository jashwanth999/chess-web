import { io } from "socket.io-client";
// export const socket = io.connect("https://chess-web-backend.herokuapp.com");
export const socket = io.connect("http://localhost:3001");
