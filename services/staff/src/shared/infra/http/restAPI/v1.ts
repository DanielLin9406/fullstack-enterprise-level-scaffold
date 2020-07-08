import { Router } from "express";
import { userRouter } from "../../../../modules/infra/http/restAPI/routes";

const v1Router = Router();

v1Router.use("/users", userRouter);

export { v1Router };
