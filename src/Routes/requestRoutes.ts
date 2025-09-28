import { Router } from "express";
import { authToken } from "../Services/MiddleWares/authToken";
import { requestController } from "../Controller/requestControllers";

const requestRouter = Router();

requestRouter.post("/solicitacoes", authToken, requestController.store);
requestRouter.get("/solicitacoes", authToken, requestController.index);
requestRouter.get("/solicitacoes/:id", authToken, requestController.show);
requestRouter.delete("/solicitacoes/:id", authToken, requestController.destroy);
requestRouter.put("/solicitacoes/:id", authToken, requestController.update);
requestRouter.post(
  "/solicitacoes/status/:id",
  authToken,
  requestController.status
);
requestRouter.post(
  "/solicitacoes/transferir/:id",
  authToken,
  requestController.secretariat
);

export default requestRouter;
