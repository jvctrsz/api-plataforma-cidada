import { Router } from "express";
import { usersController } from "../Controller/usersControllers";
import { authToken } from "../Services/MiddleWares/authToken";
import { adminPermission } from "../Services/MiddleWares/admin";

const userRouter = Router();

userRouter.post("/usuarios", authToken, usersController.store);
userRouter.get("/usuario", authToken, usersController.user);
userRouter.get("/usuarios", authToken, adminPermission, usersController.index);
userRouter.get("/usuarios/funcionarios", authToken, usersController.employees);
userRouter.get("/usuarios/:id", authToken, usersController.show);
userRouter.delete("/usuarios/:id", authToken, usersController.destroy);
userRouter.put("/usuarios/:id", authToken, usersController.update);
userRouter.post("/usuarios/trocar-senha", authToken, usersController.change);
userRouter.post("/usuarios/role/:id", authToken, usersController.role);
export default userRouter;
