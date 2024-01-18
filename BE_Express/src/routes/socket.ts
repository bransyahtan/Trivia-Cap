import { Server, Socket } from "socket.io";
import getQuizes from "../ws/getQuizes";
import user from "../ws/user";
import room, { rooms } from "../ws/room";

export default async function socketRoutes(io: Server, socket: Socket) {
  await getQuizes(io, socket);
  await user(io, socket);
  await room(io, socket);

  socket.on("disconnect", () => {
    socket.send("disconnected");
  });
}
