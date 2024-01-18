import { Server, Socket } from "socket.io";
import { rooms } from "./room";

export default async function user(io: Server, socket: Socket) {
  // menerima
  socket.on("user", message => {
    const users = rooms.room_1.users.map(u => {
      if (socket.id == u.id) {
        u.score += message.score;
      }
      return u;
    });

    rooms.room_1.users = [...new Set(users)];

    // mengirim
    socket.emit("user", rooms.room_1.users);
  });
}
