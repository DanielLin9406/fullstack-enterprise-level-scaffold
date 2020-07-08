import { Router } from "express";
import { createStaffController } from "../../../application/useCase/createStaff";

const userRouter = Router();

userRouter.post("/", (req, res) => createStaffController.execute(req, res));

export { userRouter };
