let googleConfig;
if (process.env.NODE_ENV === "production") {
  googleConfig = {
    clientID: process.env.GOOGLE_PROD_CLIENT_ID,
    clientSecret: process.env.GOOGLE_PROD_CLIENT_SECRET,
    redirectURI: process.env.GOOGLE_PROD_REDIRECT_URI,
  };
} else {
  googleConfig = {
    clientID: process.env.GOOGLE_DEV_CLIENT_ID,
    clientSecret: process.env.GOOGLE_DEV_CLIENT_SECRET,
    redirectURI: process.env.GOOGLE_DEV_REDIRECT_URI,
  };
}

export { googleConfig };
