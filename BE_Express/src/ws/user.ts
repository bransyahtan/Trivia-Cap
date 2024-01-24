import { Server, Socket } from "socket.io";
import { rooms } from "./room";

const userAnswer = [];

let id_room = "";
let users = [];

export default async function user(io: Server, socket: Socket) {
  // menerima
  socket.on("user", message => {
    const idRoom = message.idRoom;

    id_room = idRoom;

    users = rooms[idRoom]?.users
      .map(u => {
        if (socket.id == u.id) {
          u.score += message.score;
        }
        return u;
      })
      .filter((obj, idx, self) => idx === self.findIndex(o => o.name.toLowerCase() === obj.name.toLowerCase()));

    io.to(id_room).emit("user", users);

    io.to(id_room).emit("finish", users);
  });

  socket.on("answer", message => {
    const { name, avatar, answer, idRoom } = message;
    if (!name || !avatar || !answer) {
      socket.emit("answer", "name or avatar or answer is null");
      return;
    }

    let idx = userAnswer.findIndex(u => u.name == name);
    let botIdx = userAnswer.findIndex(b => b.name == "BOT_1");

    if (idx < 0) {
      userAnswer.push({
        name,
        avatar,
        answer,
      });
    }

    if (botIdx < 0) {
      userAnswer.push({
        name: "BOT_1",
        avatar: "https://www.shutterstock.com/image-vector/robot-head-avatar-vector-design-260nw-2352274355.jpg",
        answer: "X",
      });
    }

    idx = userAnswer.findIndex(u => u.name == name);
    botIdx = userAnswer.findIndex(b => b.name == "BOT_1");

    const random = Math.random();

    userAnswer[botIdx].answer = random < 0.3 ? "a" : random < 0.6 ? "b" : "c";
    userAnswer[idx].answer = answer;

    io.to(idRoom).emit("answer", userAnswer);
  });
}
