import { Router } from "express";
import { usersController } from "../../Controller/usersControllers";

const userRouter = Router();

userRouter.post("/usuarios", usersController.store);
userRouter.get("/usuarios", usersController.index);
userRouter.get("/usuarios/:id", usersController.show);
userRouter.delete("/usuarios/:id", usersController.destroy);
userRouter.put("/usuarios/:id", usersController.update);
userRouter.post("/usuarios/trocar-senha/:id", usersController.change); //passando parametro temporariamente - middleware

export default userRouter;
