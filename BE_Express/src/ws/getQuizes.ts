import { Server, Socket } from "socket.io";
import { Quize } from "../interfaces/Quize";
import { rooms } from "./room";

export default async function getQuizes(io: Server, socket: Socket) {
  try {
    socket.on("getQuizes", message => {
      const idRoom = message.idRoom;
      // check if someone is emiting event
      // to prevent duplicate event

      if (new Object(rooms[idRoom]).hasOwnProperty("isEmited") && !rooms[idRoom].isEmited) {
        rooms[idRoom].isEmited = true;
        rooms[idRoom].isFinished = false;
        const idx = message.idx;

        // finish game
        if (!rooms[idRoom].quizes[idx]) {
          rooms[idRoom].isEmited = false;
          rooms[idRoom].isFinished = true;
          rooms[idRoom].quizes = [];
          io.to(idRoom).emit("getQuizes", false);
          return;
        }

        const quize: Quize & { time: number } = { ...rooms[idRoom].quizes[+idx], time: 10 };

        const idInterval = setInterval(() => {
          io.to(idRoom).emit("getQuizes", quize);

          // timeout
          if (quize.time == 0) {
            rooms[idRoom].isEmited = false;
            clearInterval(idInterval);
          }
          quize.time -= 1;
        }, 1000);
      }
    });
  } catch (error) {
    console.log(error.message);
    socket.emit("getQuizes", "Error on fetch API");
  }
}
