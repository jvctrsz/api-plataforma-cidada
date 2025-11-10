import { Router } from "express";
import { authToken } from "../Services/MiddleWares/authToken";
import { dashboardsControllers } from "../Controller/dashboardsControllers";

const dashboardsRoutes = Router();

const { requests } = dashboardsControllers;

dashboardsRoutes.get("/total/solicitacoes", authToken, requests);

export default dashboardsRoutes;
