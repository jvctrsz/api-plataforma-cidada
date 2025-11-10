import { Router } from "express";
import { authToken } from "../Services/MiddleWares/authToken";
import { adminPermission } from "../Services/MiddleWares/admin";
import { categoriesControllers } from "../Controller/categoriesControllers";

const categoriesRouter = Router();

categoriesRouter.post(
  "/categorias",
  authToken,
  adminPermission,
  categoriesControllers.store
);
categoriesRouter.get("/categorias", authToken, categoriesControllers.index);
categoriesRouter.get("/categorias/:id", authToken, categoriesControllers.show);
categoriesRouter.delete(
  "/categorias/:id",
  authToken,
  adminPermission,
  categoriesControllers.destroy
);
categoriesRouter.put(
  "/categorias/:id",
  authToken,
  adminPermission,
  categoriesControllers.update
);

export default categoriesRouter;
