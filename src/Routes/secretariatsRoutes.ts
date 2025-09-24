import { Router } from "express";
import { authToken } from "../Services/MiddleWares/authToken";
import { secretariatsController } from "../Controller/secretariatsControllers";

const secretariatsRouter = Router();

secretariatsRouter.post(
  "/secretarias",
  authToken,
  secretariatsController.store
);

export default secretariatsRouter;
