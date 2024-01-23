import { Server, Socket } from "socket.io";
import { API } from "../lib/API";
import { Quize } from "../interfaces/Quize";
import { v4 as uuidv4 } from "uuid";
import { Room } from "../interfaces/Room";

const fetchQuizes = async () => {
  const res = await API.get("/quizes");
  if (res.data.status == "OK") {
    const quizes: Quize[] = res.data.data;
    return quizes;
  }
};

let roomGame = getRoom();
export let rooms = {
  [roomGame.idRoom]: {
    ...roomGame,
  },
};

export default async function room(io: Server, socket: Socket) {
  socket.on("joinRoom", async message => {
    let currentId = roomGame.idRoom;

    if (!message.name || !message.avatar) {
      socket.emit("joinRoom", {
        message: "name or avatar is null",
      });
      return;
    }

    for (const key in rooms) {
      console.log("keyID:", key, rooms[key].users.length);
      if (rooms[key].users.length > 3) {
        console.log("keyID:", rooms[key].users.length, "Room is full");
        const newRoom = getRoom();
        rooms[newRoom.idRoom] = {
          ...newRoom,
        };
        currentId = newRoom.idRoom;

        break;
      }
    }

    // check if quizes is null
    // then suffling quizes
    if (rooms[currentId].quizes.length == 0) {
      rooms[currentId].quizes = (await fetchQuizes()).sort(() => Math.random() - 0.5).slice(0, 2);
    }

    rooms[currentId].users.push({
      name: message.name,
      avatar: message.avatar,
      id: socket.id,
      score: 0,
    });

    socket.join(rooms[currentId].idRoom);
    const idInterval = setInterval(() => {
      if (rooms[currentId].timeout < 0) {
        clearInterval(idInterval);
        // roomGame = getRoom();
        return;
      }

      if (rooms[currentId].timeout <= 2) {
        if (rooms[currentId].users.length < 3) {
          rooms[currentId].users.push({
            name: "BOT_1",
            avatar: "https://www.shutterstock.com/image-vector/robot-head-avatar-vector-design-260nw-2352274355.jpg",
            id: Math.random().toString(),
            score: 0,
          });
        }
      }

      if (rooms[currentId].users.length == 3) {
        clearInterval(idInterval);
        io.to(rooms[currentId].idRoom).emit("joinRoom", "start");
      }

      io.to(rooms[currentId].idRoom).emit(
        "joinRoom",
        rooms[currentId].users,
        rooms[currentId].timeout,
        rooms[currentId].idRoom
      );
      rooms[currentId].timeout -= 1;
    }, 1000);
  });
}

export function getRoom(): Room {
  return {
    isEmited: false,
    isFinished: false,
    quizes: [],
    timeout: 10,
    users: [],
    idRoom: uuidv4(),
  };
}
