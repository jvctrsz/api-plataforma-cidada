import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  deleteImagesScheme,
  getImagesScheme,
  getMessagesScheme,
  getRequestScheme,
  postMessagesScheme,
  postRequestScheme,
  putRequestScheme,
  requestQueriesScheme,
  secretariatRequestScheme,
  statusRequestScheme,
} from "../../Schemes/request.scheme";
import z from "zod";
import {
  idParams,
  internalError,
  unauthorized,
} from "../../Schemes/default.scheme";
import {
  defaultError,
  defaultOKStatus,
} from "../../Utils/Functions/docFunctions";
import { notAllowed } from "./secretariatsRegistry";

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
    "201": defaultOKStatus("Solicitação cadastrada com sucesso"),
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
            categoryError: {
              summary: "Erro de Categoria",
              value: {
                error: "Categoria não encontrada.",
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
    "409": defaultError("Secretaria esta desativada"),
    "500": internalError,
  },
});

//put
requestRegistry.registerPath({
  method: "put",
  path: "/api/solicitacoes/{id}",
  summary: "Edita uma solicitação.",
  tags: ["Solicitações"],
  request: {
    params: idParams,
    body: {
      content: {
        "application/json": { schema: putRequestScheme },
      },
    },
  },
  responses: {
    "201": defaultOKStatus("Solicitação editada com sucesso"),
    "401": unauthorized,
    "404": {
      description: "Registro não encontrados",
      content: {
        "application/json": {
          schema: {},
          examples: {
            requestError: {
              summary: "Erro de Solicitação",
              value: {
                error: "Solicitação não encontrada.",
              },
            },
            categoryError: {
              summary: "Erro de Categoria",
              value: {
                error: "Categoria não encontrada.",
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
    "409": defaultError("Secretaria esta desativada"),
    "500": internalError,
  },
});

//get
requestRegistry.registerPath({
  method: "get",
  path: "/api/solicitacoes",
  summary: "Retorna todas as solicitações.",
  tags: ["Solicitações"],
  request: {
    query: requestQueriesScheme,
  },
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
    "200": defaultOKStatus("Solicitação deletada com sucesso"),
    "401": unauthorized,
    "404": requestNotFound,
    "500": internalError,
  },
});

//status
requestRegistry.registerPath({
  method: "post",
  path: "/api/solicitacoes/status/{id}",
  summary: "Altera o status de uma solicitação.",
  tags: ["Solicitações"],
  request: {
    params: idParams,
    body: {
      content: {
        "application/json": { schema: statusRequestScheme },
      },
    },
  },
  responses: {
    "200": defaultOKStatus("Status alterado com sucesso"),
    "401": unauthorized,
    "403": notAllowed,
    "404": requestNotFound,
    "409": defaultError("A Solicitação já está com o status: criado"),
    "500": internalError,
  },
});

//enviar mensagem
requestRegistry.registerPath({
  method: "post",
  path: "/api/solicitacoes/{id}/mensagem",
  summary: "Envia uma mensagem.",
  tags: ["Mensagens"],
  request: {
    params: idParams,
    body: {
      content: {
        "application/json": { schema: postMessagesScheme },
      },
    },
  },
  responses: {
    "201": defaultOKStatus("Mensagem enviada com sucesso"),
    "401": unauthorized,
    "403": defaultError(
      "Usuário não tem acesso as mensagens desta solicitação"
    ),
    "404": {
      description: "Registros não encontrados",
      content: {
        "application/json": {
          schema: {},
          examples: {
            requestError: {
              summary: "Erro de Solicitação",
              value: {
                error: "Solicitação não encontrada.",
              },
            },
            usertError: {
              summary: "Erro de usuário",
              value: {
                error: "Usuário não encontrado.",
              },
            },
          },
        },
      },
    },
    "500": internalError,
  },
});

requestRegistry.registerPath({
  method: "get",
  path: "/api/solicitacoes/{id}/mensagem",
  summary: "Retorna todas as mensagem.",
  tags: ["Mensagens"],
  request: {
    params: idParams,
  },
  responses: {
    "200": {
      description: "Retorna um array com todas as mensagens",
      content: {
        "application/json": {
          schema: z.array(getMessagesScheme),
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
            requestError: {
              summary: "Erro de Solicitação",
              value: {
                error: "Solicitação não encontrada.",
              },
            },
            usertError: {
              summary: "Erro de usuário",
              value: {
                error: "Usuário não encontrado.",
              },
            },
          },
        },
      },
    },
    "403": defaultError(
      "Usuário não tem acesso as mensagens desta solicitação"
    ),
    "500": internalError,
  },
});

//post images
requestRegistry.registerPath({
  method: "post",
  path: "/api/solicitacoes/{id}/imagens",
  summary: "Vincula imagens a uma solicitação",
  description:
    "Deve ser enviado um array de imagems, para que funcione deve ser enviado como FORM-DATA. Uma solicitação pode ter no máximo 5 imagens.",
  tags: ["Imagens"],
  request: {
    params: idParams,
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            files: z.array(
              z.any().openapi({
                type: "string",
                format: "binary",
              })
            ),
          }),
        } as any,
      },
    },
  },
  responses: {
    "200": defaultOKStatus("Imagens salvas com sucesso."),
    "400": defaultError("Nenhuma imagem enviada"),
    "401": unauthorized,
    "404": defaultError("Solicitação não encontrada"),
    "409": defaultError("Limite de 5 imagens atingido"),
    "500": internalError,
  },
});

//get images
requestRegistry.registerPath({
  method: "get",
  path: "/api/solicitacoes/{id}/imagens",
  summary: "Retorna todas as imagens vinculadas a uma solicitação",
  tags: ["Imagens"],
  request: {
    params: idParams,
  },
  responses: {
    "200": {
      description: "Retorna um array de imagens",
      content: {
        "application/json": {
          schema: getImagesScheme,
        },
      },
    },
    "401": unauthorized,
    "404": defaultError("Solicitação não encontrada"),
    "500": internalError,
  },
});

requestRegistry.registerPath({
  method: "delete",
  path: "/api/solicitacoes/{id}/imagens",
  summary: "Deleta imagens vinculadas a uma solicitação",
  description:
    "Para deletar as imagens devem ser enviado o public_id de cada imagem. Pode ser enviado um único public_id, ou um array de public_id.",
  tags: ["Imagens"],
  request: {
    params: idParams,
    body: {
      content: {
        "application/json": {
          schema: deleteImagesScheme,
        },
      },
    },
  },
  responses: {
    "200": defaultOKStatus("Imagens deletadas com sucesso."),
    "400": defaultError("Nenhum ID válido enviado"),
    "401": unauthorized,
    "404": defaultError("Solicitação não encontrada"),
    "409": defaultError("Não há nenhuma imagem nesta solicitação"),
    "500": internalError,
  },
});

export default requestRegistry;
