import { Router } from "express";
import { usersController } from "../../Controller/usersControllers";

const userRouter = Router();

userRouter.post("/usuarios", usersController.store);
userRouter.get("/usuarios", usersController.index);
userRouter.get("/usuarios/:id", usersController.show);
export default userRouter;
