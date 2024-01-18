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
    timeout: 7,
  },
};

export default async function room(io: Server, socket: Socket) {
  socket.on("joinRoom", async message => {
    // check if quizes is null
    // then suffling quizes
    if (rooms["room_1"].quizes.length == 0) {
      rooms["room_1"].quizes = (await fetchQuizes()).sort(() => Math.random() - 0.5).slice(0, 3);
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
      score: 0,
    });

    socket.join("room_1");
    const idInterval = setInterval(() => {
      if (rooms.room_1.timeout < 0) {
        clearInterval(idInterval);
        return;
      }

      console.log(rooms.room_1.users.length);
      if (rooms.room_1.timeout <= 2) {
        if (rooms.room_1.users.length < 3) {
          rooms.room_1.users.push({
            name: "BOT_1",
            avatar: "https://www.shutterstock.com/image-vector/robot-head-avatar-vector-design-260nw-2352274355.jpg",
            id: Math.random().toString(),
            score: 0,
          });
        }
      }
      if (rooms.room_1.users.length == 3) {
        io.to("room_1").emit("joinRoom", "start");
      }

      io.to("room_1").emit("joinRoom", rooms.room_1.users, rooms.room_1.timeout);
      rooms.room_1.timeout -= 1;
    }, 1000);
  });
}
