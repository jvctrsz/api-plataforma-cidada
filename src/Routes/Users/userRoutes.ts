import { Router } from "express";
import { usersController } from "../../Controller/usersControllers";

const userRouter = Router();

userRouter.post("/usuario", usersController.store);
export default userRouter;
