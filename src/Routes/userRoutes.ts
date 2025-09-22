import { Router } from "express";
import { usersController } from "../Controller/usersControllers";
import { authToken } from "../Services/MiddleWares/authToken";

const userRouter = Router();

userRouter.post("/usuarios", usersController.store);
userRouter.get("/usuarios", usersController.index);
userRouter.get("/usuarios/:id", usersController.show);
userRouter.delete("/usuarios/:id", usersController.destroy);
userRouter.put("/usuarios/:id", usersController.update);
userRouter.post(
  "/usuarios/trocar-senha/:id",
  authToken,
  usersController.change
); //passando parametro temporariamente - middleware
userRouter.post("/usuarios/recuperar-senha", usersController.recovery);
userRouter.post("/usuarios/redefinir-senha/:token", usersController.redefine);

export default userRouter;
