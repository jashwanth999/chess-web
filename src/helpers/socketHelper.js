import { io } from "socket.io-client";
export const socket = io.connect("https://git.heroku.com/boiling-headland-42694.git");

