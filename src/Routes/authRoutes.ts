import { Router } from "express";
import { authController } from "../Controller/authControllers";

const authRouter = Router();

authRouter.post("/auth/login", authController.login);
authRouter.post("/auth/register", authController.register);
authRouter.post("/auth/ativar-conta/:token", authController.active);

export default authRouter;
