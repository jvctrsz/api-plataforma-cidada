import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  getSecretariatsScheme,
  postSecretariatsScheme,
} from "../../Schemes/secretariats.scheme";
import {
  idParams,
  internalError,
  unauthorized,
} from "../../Schemes/default.scheme";
import z from "zod";

const secretariatsRegistry = new OpenAPIRegistry();

const secretariatsNotFound = {
  description: "Secretaria não encontrada",
  content: {
    "application/json": {
      schema: z.object({
        error: z.string().openapi({ example: "Secretaria não encontrada." }),
      }),
    },
  },
};

secretariatsRegistry.registerPath({
  method: "post",
  path: "/api/secretarias",
  summary: "Cadastra uma nova secretaria.",
  description:
    'Usuários com role do tipo "usario" não podem cadastrar secretarias.',
  tags: ["Secretaria"],
  request: {
    body: {
      content: {
        "application/json": { schema: postSecretariatsScheme },
      },
    },
  },
  responses: {
    "201": {
      description: "Usuário cadastrado com sucesso",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Secretaria cadastrada com sucesso." }),
          }),
        },
      },
    },
    "401": unauthorized,
    "403": {
      description: "Usuário sem permissão.",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "Usuário não tem permissão para esta operação",
            }),
          }),
        },
      },
    },
    "409": {
      description: "Secretaria já cadastrada.",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({ example: "Secretaria já cadastrada." }),
          }),
        },
      },
    },
    "500": internalError,
  },
});

secretariatsRegistry.registerPath({
  method: "get",
  path: "/api/secretarias",
  summary: "Retorna todas as secretarias.",
  tags: ["Secretaria"],
  responses: {
    "200": {
      description: "Retorna um array com todas as secretarias",
      content: {
        "application/json": {
          schema: z.array(getSecretariatsScheme),
        },
      },
    },
    "401": unauthorized,
    "500": internalError,
  },
});

secretariatsRegistry.registerPath({
  method: "get",
  path: "/api/secretarias/{id}",
  summary: "Retorna uma única secretaria.",
  tags: ["Secretaria"],
  request: {
    params: idParams,
  },
  responses: {
    "200": {
      description: "Retorna o objeto da secretaria",
      content: {
        "application/json": {
          schema: getSecretariatsScheme,
        },
      },
    },
    "401": unauthorized,
    "404": secretariatsNotFound,
    "500": internalError,
  },
});

export default secretariatsRegistry;
