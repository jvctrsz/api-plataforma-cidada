import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { postCategoriesScheme } from "../../Schemes/categories.scheme";
import { defaultOKStatus } from "../../Utils/Functions/docFunctions";
import { internalError, unauthorized } from "../../Schemes/default.scheme";
import { notAllowed } from "./secretariatsRegistry";

const categoriesRegistry = new OpenAPIRegistry();

categoriesRegistry.registerPath({
  method: "post",
  path: "/api/categorias",
  summary: "Cria uma nova categoria",
  description:
    "Rota para criar novas categorias que devem ser vinculadas a uma secretaria.",
  tags: ["Categorias"],
  request: {
    body: {
      content: {
        "application/json": { schema: postCategoriesScheme },
      },
    },
  },
  responses: {
    "201": defaultOKStatus("Categoria cadastrada com sucesso"),
    "401": unauthorized,
    "403": notAllowed,
    "500": internalError,
  },
});

export default categoriesRegistry;
