import { Server, Socket } from "socket.io";
import { API } from "../lib/API";
import { Quize } from "../interfaces/Quize";
import { rooms } from "./room";

export default async function getQuizes(io: Server, socket: Socket) {
  try {
    // const data = await fetchQuizes();

    socket.on("getQuizes", message => {
      // check if someone is emiting event
      // to prevent duplicate event
      if (!rooms.room_1.isEmited) {
        rooms.room_1.isEmited = true;
        rooms.room_1.isFinished = false;
        const idx = message.idx;
        console.log(rooms.room_1.quizes[+idx]);

        // finish game
        if (message.idx == rooms.room_1.quizes.length) {
          rooms.room_1.isEmited = false;
          rooms.room_1.isFinished = true;
          rooms.room_1.quizes = [];
          io.to("room_1").emit("getQuizes", false);
          return;
        }

        const quize: Quize = { ...rooms.room_1.quizes[+idx], time: 5 };

        const idInterval = setInterval(() => {
          io.to("room_1").emit("getQuizes", quize);

          // timeout
          if (quize.time == 0) {
            rooms.room_1.isEmited = false;
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
