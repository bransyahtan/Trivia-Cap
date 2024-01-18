import { Server, Socket } from "socket.io";
import { API } from "../lib/API";
import { Quize } from "../interfaces/Quize";

const fetchQuizes = async () => {
  const res = await API.get("/quizes");
  if (res.data.status == "OK") {
    const quizes: Quize[] = res.data.data;
    return quizes;
  }
};

export const rooms = {
  room_1: {
    quizes: [],
    users: [],
    isEmited: false,
    isFinished: true,
  },
};

export default async function room(io: Server, socket: Socket) {
  socket.on("joinRoom", async message => {
    // check if quizes is null
    // then suffling quizes
    if (rooms["room_1"].quizes.length == 0) {
      rooms["room_1"].quizes = (await fetchQuizes()).sort(() => Math.random() * 0.5).slice(0, 9);
    }

    if (!message.name || !message.avatar) {
      socket.emit("joinRoom", {
        message: "name or avatar is null",
      });
      return;
    }

    rooms.room_1.users.push({
      name: message.name,
      avatar: message.avatar,
      id: socket.id,
    });

    socket.join("room_1");
    io.to("room_1").emit("joinRoom", rooms.room_1.users);

    if (rooms.room_1.users.length == 3) {
      io.to("room_1").emit("joinRoom", "start");
    }
  });
}
