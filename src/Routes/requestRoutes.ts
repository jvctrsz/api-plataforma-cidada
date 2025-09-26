import { Router } from "express";
import { authToken } from "../Services/MiddleWares/authToken";
import { requestController } from "../Controller/requestControllers";

const requestRouter = Router();

requestRouter.post("/solicitacoes", authToken, requestController.store);
requestRouter.get("/solicitacoes", authToken, requestController.index);

export default requestRouter;
