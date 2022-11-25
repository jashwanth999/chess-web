import { io } from "socket.io-client";
export const socket = io.connect("https://chess-web-backend.herokuapp.com");

