import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  getRequestScheme,
  postRequestScheme,
} from "../../Schemes/request.scheme";
import z from "zod";
import { internalError, unauthorized } from "../../Schemes/default.scheme";

const requestRegistry = new OpenAPIRegistry();

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

export default requestRegistry;
