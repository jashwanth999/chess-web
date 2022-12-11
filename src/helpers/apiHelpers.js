import { io } from "socket.io-client";

export const url = "https://chess-web-backend.onrender.com";
export const socket = io.connect(url);
