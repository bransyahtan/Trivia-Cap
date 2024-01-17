import { Server, Socket } from "socket.io";
import { API } from "../lib/API";
import { Quize } from "../interfaces/Quize";

const fetchQuizes = async () => {
  const res = await API.get("/quizes");
  if (res.data.status == "OK") {
    const quizes: Quize[] = res.data.data;
    return quizes.sort(() => Math.random() - 0.5).slice(0, 9);
  }
};

export default async function getQuizes(io: Server, socket: Socket) {
  try {
    const data = await fetchQuizes();

    socket.on("getQuizes", message => {
      const idx = message.idx;
      if (message.idx == data.length) {
        socket.emit("getQuizes", false);
        return;
      }

      const quize: Quize = { ...data[idx], time: 5 };

      const idInterval = setInterval(() => {
        socket.emit("getQuizes", quize);

        if (quize.time == 0) {
          clearInterval(idInterval);
        }
        quize.time -= 1;
      }, 1000);
    });
  } catch (error) {
    console.log(error.message);
    socket.emit("getQuizes", "Error on fetch API");
  }
}
