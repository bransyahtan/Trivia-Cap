import { Server, Socket } from "socket.io";

export default async function joinRoom(io: Server, socket: Socket) {
  socket.on("joinRoom", () => {
    socket.join("room_1");
  });
}
