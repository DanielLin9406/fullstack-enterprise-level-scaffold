import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { v1Router } from "./restAPI/v1";
const origin = {
  origin: "*",
};
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));

app.use("/v1", v1Router);

app.listen(process.env.PORT, () => {
  console.log(`User API Service listening on port ${process.env.PORT}!`);
});

export default app;
