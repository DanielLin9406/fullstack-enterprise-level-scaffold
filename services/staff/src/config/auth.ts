let authConfig;
if (process.env.NODE_ENV === "production") {
  authConfig = {
    secret: process.env.SECRET_PROD,
  };
} else {
  authConfig = {
    secret: process.env.SECRET_DEV,
  };
}

export { authConfig };
