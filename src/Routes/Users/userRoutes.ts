import { Router } from "express";
import { usersController } from "../../Controller/Users/usersControllers";

const userRouter = Router();

userRouter.post("/usuario", usersController.store);
export default userRouter;
