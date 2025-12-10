import { writable } from "svelte/store";
import { io } from "socket.io-client";

const server = "http://10.138.216.18:3000";

const socket = io(server, {
  transports: ["websocket"],
});

export const socketStore = writable(socket);

socket.on("connection", () => {
  console.log("Socket connected:", socket.id);
});
