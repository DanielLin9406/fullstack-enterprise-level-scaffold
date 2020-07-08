let hostConfig;
if (process.env.NODE_ENV === "production") {
  hostConfig = {
    redisHost: process.env.REDIS_PROD_HOST,
    redisPort: process.env.REDIS_PROD_PORT,
  };
} else {
  hostConfig = {
    redisHost: process.env.REDIS_DEV_HOST,
    redisPort: process.env.REDIS_DEV_PORT,
  };
}

export { hostConfig };
