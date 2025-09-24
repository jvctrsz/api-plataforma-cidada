import { Router } from "express";
import { authToken } from "../Services/MiddleWares/authToken";
import { secretariatsController } from "../Controller/secretariatsControllers";
import { permission } from "../Services/MiddleWares/permission";

const secretariatsRouter = Router();

secretariatsRouter.post(
  "/secretarias",
  authToken,
  permission,
  secretariatsController.store
);
secretariatsRouter.get(
  "/secretarias",
  authToken,

  secretariatsController.index
);
secretariatsRouter.get(
  "/secretarias/:id",
  authToken,
  secretariatsController.show
);

export default secretariatsRouter;
