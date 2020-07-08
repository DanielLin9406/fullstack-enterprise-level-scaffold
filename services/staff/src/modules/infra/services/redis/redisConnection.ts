import redis, { Redis } from "redis";
import { hostConfig } from "../../../../config";

const port = hostConfig.redisPort;
const host = hostConfig.redisHost;
const redisConnection: Redis = redis.createClient(`${host}:${port}`);

redisConnection.on("connect", () => {
  console.log(`[Redis]: Connected to redis server at ${host}:${port}`);
});
