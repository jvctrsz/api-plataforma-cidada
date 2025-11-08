import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  categoriesQueryScheme,
  getCategoriesScheme,
  postCategoriesScheme,
} from "../../Schemes/categories.scheme";
import {
  defaultError,
  defaultOKStatus,
} from "../../Utils/Functions/docFunctions";
import { internalError, unauthorized } from "../../Schemes/default.scheme";
import { notAllowed } from "./secretariatsRegistry";
import z from "zod";

const categoriesRegistry = new OpenAPIRegistry();

//post
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
    "404": defaultError("Secretaria não encontrada"),
    "409": defaultError("Já existe uma categoria com este nome"),
    "500": internalError,
  },
});

//get
categoriesRegistry.registerPath({
  method: "get",
  path: "/api/categorias",
  summary: "Lista todas as categorias",
  tags: ["Categorias"],
  request: {
    query: categoriesQueryScheme,
  },
  responses: {
    "200": {
      description: "Retorna um array com todas as categorias",
      content: {
        "application/json": {
          schema: z.array(getCategoriesScheme),
        },
      },
    },
    "401": unauthorized,
    "500": internalError,
  },
});

export default categoriesRegistry;
