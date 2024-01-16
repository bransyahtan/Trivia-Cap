import { io } from "socket.io-client"
export const socket = io("http://192.168.18.238:3000", {
  autoConnect: false,
})
