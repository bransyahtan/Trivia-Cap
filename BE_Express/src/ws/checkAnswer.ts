import { Server, Socket } from "socket.io";
import { Quize } from "../interfaces/Quize";

export default async function getQuizes(io: Server, socket: Socket) {
  socket.on("checkAnswer", (message: Quize & { userAnswer: string; name: string }) => {
    if (message.userAnswer != message.answer) {
      socket.emit("checkAnswer", {
        isCorrect: false,
      });

      return;
    }

    socket.emit("checkAnswer", {
      isCorrect: true,
    });
  });
}
