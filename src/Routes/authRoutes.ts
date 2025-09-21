import { Router } from "express";
import { authController } from "../Controller/authControllers";

const authRouter = Router();

authRouter.post("/auth/login", authController.login);

export default authRouter;
