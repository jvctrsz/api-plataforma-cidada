import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { internalError, unauthorized } from "../../Schemes/default.scheme";
import z from "zod";
import { totalRequestScheme } from "../../Schemes/dashboards.scheme";

const dashboardRegistry = new OpenAPIRegistry();

//total solicitacoes
dashboardRegistry.registerPath({
  method: "get",
  path: "/api/total/solicitacoes",
  summary: "Retorna total de solicitações",
  description:
    "Rota para utilizar card totalizador das solicitações por status",
  tags: ["Totalizador"],
  responses: {
    "200": {
      description: "Retorna um objeto com os totais",
      content: {
        "application/json": {
          schema: z.array(totalRequestScheme),
        },
      },
    },
    "401": unauthorized,
    "500": internalError,
  },
});

export default dashboardRegistry;
