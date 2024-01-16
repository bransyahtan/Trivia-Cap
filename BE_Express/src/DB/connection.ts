import * as redis from "redis";

export const redisClient = redis.createClient();
(async () => await redisClient.connect())();
