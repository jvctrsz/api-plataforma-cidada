import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  getRequestScheme,
  postRequestScheme,
} from "../../Schemes/request.scheme";
import z from "zod";
import {
  idParams,
  internalError,
  unauthorized,
} from "../../Schemes/default.scheme";

const requestRegistry = new OpenAPIRegistry();

export const requestNotFound = {
  description: "Solicitação não encontrada",
  content: {
    "application/json": {
      schema: z.object({
        error: z.string().openapi({ example: "Solicitação não encontrada." }),
      }),
    },
  },
};

//post
requestRegistry.registerPath({
  method: "post",
  path: "/api/solicitacoes",
  summary: "Cadastra uma nova solicitação.",
  tags: ["Solicitações"],
  request: {
    body: {
      content: {
        "application/json": { schema: postRequestScheme },
      },
    },
  },
  responses: {
    "201": {
      description: "Solicitação cadastrada com sucesso",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Solicitação cadastrada com sucesso." }),
          }),
        },
      },
    },
    "401": unauthorized,
    "404": {
      description: "Registros não encontrados",
      content: {
        "application/json": {
          schema: {},
          examples: {
            userError: {
              summary: "Erro de usuário",
              value: {
                error: "Usuário não encontrado.",
              },
            },
            secretariatError: {
              summary: "Erro de secretaria",
              value: {
                error: "Secretaria não encontrada.",
              },
            },
          },
        },
      },
    },
    "409": {
      description: "Secretaria esta desativada",
      content: {
        "application/json": {
          schema: z.object({
            error: z
              .string()
              .openapi({ example: "Secretaria esta desativada." }),
          }),
        },
      },
    },
    "500": internalError,
  },
});

//get
requestRegistry.registerPath({
  method: "get",
  path: "/api/solicitacoes",
  summary: "Retorna todas as solicitações.",
  tags: ["Solicitações"],
  responses: {
    "200": {
      description: "Retorna um array com todas as solicitações",
      content: {
        "application/json": {
          schema: z.array(getRequestScheme),
        },
      },
    },
    "401": unauthorized,
    "500": internalError,
  },
});

//show
requestRegistry.registerPath({
  method: "get",
  path: "/api/solicitacoes/{id}",
  summary: "Retorna uma única solicitação.",
  tags: ["Solicitações"],
  request: {
    params: idParams,
  },
  responses: {
    "200": {
      description: "Retorna uma solicitação",
      content: {
        "application/json": {
          schema: getRequestScheme,
        },
      },
    },
    "401": unauthorized,
    "404": requestNotFound,
    "500": internalError,
  },
});

//delete
requestRegistry.registerPath({
  method: "delete",
  path: "/api/solicitacoes/{id}",
  summary: "Deleta uma solicitação.",
  tags: ["Solicitações"],
  request: {
    params: idParams,
  },
  responses: {
    "200": {
      description: "Solicitação deletada com sucesso",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Solicitação deletada com sucesso." }),
          }),
        },
      },
    },
    "401": unauthorized,
    "404": requestNotFound,
    "500": internalError,
  },
});

export default requestRegistry;
