import { Server, Socket } from "socket.io";
import { API } from "../lib/API";
import { Quize } from "../interfaces/Quize";

const fetchQuizes = async () => {
  const res = await API.get("/quizes");
  console.log("fetch quizes");
  if (res.data.status == "OK") {
    const quizes: Quize[] = res.data.data;
    return quizes;
  }
};

export const rooms = {
  room_1: {
    quizes: [],
    isEmited: false,
    isFinished: true,
  },
};

export default async function room(io: Server, socket: Socket) {
  socket.on("joinRoom", async () => {
    // check if quizes is null
    // then suffling quizes
    if (rooms["room_1"].quizes.length == 0) {
      rooms["room_1"].quizes = (await fetchQuizes()).sort(() => Math.random() * 0.5).slice(0, 9);
    }

    socket.join("room_1");
    io.to("room_1").emit("joinRoom", rooms.room_1.quizes);
  });
}
