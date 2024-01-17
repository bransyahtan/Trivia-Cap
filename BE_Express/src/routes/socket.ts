import { Server, Socket } from "socket.io";
import sMatchMacking from "./matchmacking";
import getQuizes from "../ws/getQuizes";
import user from "../ws/user";

export default async function socketRoutes(io: Server, socket: Socket) {
  await getQuizes(io, socket);
  await user(io, socket);

  socket.on("matchmacking", sMatchMacking);

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnect`);
    socket.send("disconnected");
  });
}
