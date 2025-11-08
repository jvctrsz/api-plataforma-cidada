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

export default categoriesRouter;
