import { redisClient } from "../DB/connection";

// search redish is there an
export default async function sMatchMacking(message: any) {
  const user = JSON.parse(message);

  for (let i = 0; i < 5; i++) {
    const res = await redisClient.sMembers(`room:${i}`);
    if (res.length < 3) {
      console.log(`enter room:${i}, ${user.name}`);
      await redisClient.sAdd("room", JSON.stringify(user));
      break;
    }
    console.log("Room is full:\n", res);
    break;
  }
}
