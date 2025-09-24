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
secretariatsRouter.put(
  "/secretarias/:id",
  authToken,
  permission,
  secretariatsController.update
);
secretariatsRouter.delete(
  "/secretarias/:id",
  authToken,
  permission,
  secretariatsController.destroy
);

export default secretariatsRouter;
