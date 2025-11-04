import { Router } from "express";
import { authToken } from "../Services/MiddleWares/authToken";
import { requestController } from "../Controller/requestControllers";
import { permission } from "../Services/MiddleWares/permission";
import upload from "../Services/Images/upload";

const requestRouter = Router();

requestRouter.post("/solicitacoes", authToken, requestController.store);
requestRouter.get("/solicitacoes", authToken, requestController.index);
requestRouter.get("/solicitacoes/:id", authToken, requestController.show);
requestRouter.delete("/solicitacoes/:id", authToken, requestController.destroy);
requestRouter.put("/solicitacoes/:id", authToken, requestController.update);
requestRouter.post(
  "/solicitacoes/status/:id",
  authToken,
  permission,
  requestController.status
);
requestRouter.post(
  "/solicitacoes/transferir/:id",
  authToken,
  permission,
  requestController.secretariat
);
requestRouter.post(
  "/solicitacoes/:id/mensagem",
  authToken,
  requestController.send
);
requestRouter.get(
  "/solicitacoes/:id/mensagem",
  authToken,
  requestController.messages
);
requestRouter.post(
  "/solicitacoes/:id/imagens",
  authToken,
  upload.array("imagens", 5),
  requestController.images
);

export default requestRouter;
