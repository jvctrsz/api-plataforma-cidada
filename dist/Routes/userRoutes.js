"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = require("../../Controller/usersControllers");
const userRouter = (0, express_1.Router)();
userRouter.post("/usuarios", usersControllers_1.usersController.store);
userRouter.get("/usuarios", usersControllers_1.usersController.index);
userRouter.get("/usuarios/:id", usersControllers_1.usersController.show);
userRouter.delete("/usuarios/:id", usersControllers_1.usersController.destroy);
userRouter.put("/usuarios/:id", usersControllers_1.usersController.update);
userRouter.post("/usuarios/trocar-senha/:id", usersControllers_1.usersController.change); //passando parametro temporariamente - middleware
userRouter.post("/usuarios/recuperar-senha", usersControllers_1.usersController.recovery);
userRouter.post("/usuarios/redefinir-senha/:token", usersControllers_1.usersController.redefine);
exports.default = userRouter;
