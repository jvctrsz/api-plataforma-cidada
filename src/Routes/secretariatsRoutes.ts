import { Router } from "express";
import { authToken } from "../Services/MiddleWares/authToken";
import { secretariatsController } from "../Controller/secretariatsControllers";
import { permission } from "../Services/MiddleWares/permission";
import { adminPermission } from "../Services/MiddleWares/admin";

const secretariatsRouter = Router();

secretariatsRouter.post(
  "/secretarias",
  authToken,
  adminPermission,
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
  adminPermission,
  secretariatsController.destroy
);
secretariatsRouter.post(
  "/secretarias/ativar/:id",
  authToken,
  adminPermission,
  secretariatsController.active
);
secretariatsRouter.post(
  "/secretarias/desativar/:id",
  authToken,
  adminPermission,
  secretariatsController.deactive
);
secretariatsRouter.post(
  "/secretarias/:id/alterar-secretario",
  authToken,
  adminPermission,
  secretariatsController.change
);

export default secretariatsRouter;
