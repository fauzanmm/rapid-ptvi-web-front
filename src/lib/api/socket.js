import { io } from "socket.io-client";

const server = import.meta.env.VITE_URL_SOCKET;
export const socket = io(server);
