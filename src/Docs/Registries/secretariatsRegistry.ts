import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  putSecretariatsScheme,
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

export const secretariatsNotFound = {
  description: "Secretaria não encontrada",
  content: {
    "application/json": {
      schema: z.object({
        error: z.string().openapi({ example: "Secretaria não encontrada." }),
      }),
    },
  },
};
const secretariatConflict = {
  "application/json": {
    schema: {},
    examples: {
      nameError: {
        summary: "Erro mesmo nome",
        value: {
          error: "Já existe uma secretaria com este nome.",
        },
      },
      secretarioError: {
        summary: "Erro mesmo secretario",
        value: {
          error: "Já existe uma secretaria vinculada a este secretario.",
        },
      },
    },
  },
};
const secretariatExisting = {
  description: "Secretaria já cadastrada.",
  content: {
    "application/json": {
      schema: z.object({
        error: z
          .string()
          .openapi({ example: "Já existe uma secretaria com este nome." }),
      }),
    },
  },
};
const notAllowed = {
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
};
export const secretaryNotFound = {
  description: "Secretario não encontrado.",
  content: {
    "application/json": {
      schema: z.object({
        error: z.string().openapi({ example: "Secretario não encontrado." }),
      }),
    },
  },
};

//post
secretariatsRegistry.registerPath({
  method: "post",
  path: "/api/secretarias",
  summary: "Cadastra uma nova secretaria.",
  description:
    'Usuários com role do tipo "usario" não podem cadastrar secretarias.',
  tags: ["Secretarias"],
  request: {
    body: {
      content: {
        "application/json": { schema: postSecretariatsScheme },
      },
    },
  },
  responses: {
    "201": {
      description: "Secretaria cadastrado com sucesso",
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
    "403": notAllowed,
    "404": secretaryNotFound,
    "409": {
      description: "Conflitro de secretaria",
      content: secretariatConflict,
    },
    "500": internalError,
  },
});

//put
secretariatsRegistry.registerPath({
  method: "put",
  path: "/api/secretarias/{id}",
  summary: "Edita uma secretaria.",
  description:
    'Usuários com role do tipo "usario" não podem editar secretarias.',
  tags: ["Secretarias"],
  request: {
    params: idParams,
    body: {
      content: {
        "application/json": { schema: putSecretariatsScheme },
      },
    },
  },
  responses: {
    "201": {
      description: "Secretaria editada com sucesso",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Secretaria editada com sucesso." }),
          }),
        },
      },
    },
    "401": unauthorized,
    "403": notAllowed,
    "404": secretariatsNotFound,
    "409": secretariatExisting,
    "500": internalError,
  },
});

//get
secretariatsRegistry.registerPath({
  method: "get",
  path: "/api/secretarias",
  summary: "Retorna todas as secretarias.",
  tags: ["Secretarias"],
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

//get index
secretariatsRegistry.registerPath({
  method: "get",
  path: "/api/secretarias/{id}",
  summary: "Retorna uma única secretaria.",
  tags: ["Secretarias"],
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

//delete
secretariatsRegistry.registerPath({
  method: "delete",
  path: "/api/secretarias/{id}",
  summary: "Deleta uma secretaria.",
  description:
    'Usuários com role do tipo "usario" não podem deletar secretarias.',
  tags: ["Secretarias"],
  request: {
    params: idParams,
  },
  responses: {
    "200": {
      description: "Secretaria deletada com sucesso.",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Secretaria deletada com sucesso." }),
          }),
        },
      },
    },
    "401": unauthorized,
    "403": notAllowed,
    "404": secretariatsNotFound,
    "409": {
      description: "Secretaria vinculada",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example:
                "Esta secretaria esta vinculada a solicitações, não é possível deletar.",
            }),
          }),
        },
      },
    },
    "500": internalError,
  },
});

//ativar
secretariatsRegistry.registerPath({
  method: "post",
  path: "/api/secretarias/ativar/{id}",
  summary: "Ativa uma secretaria.",
  tags: ["Secretarias"],
  request: {
    params: idParams,
  },
  responses: {
    "200": {
      description: "Secretaria ativada com sucesso.",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Secretaria ativada com sucesso." }),
          }),
        },
      },
    },
    "401": unauthorized,
    "403": notAllowed,
    "404": secretariatsNotFound,
    "409": {
      description: "Secretaria já está ativa",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "Secretaria já está ativa.",
            }),
          }),
        },
      },
    },
    "500": internalError,
  },
});
//desativar
secretariatsRegistry.registerPath({
  method: "post",
  path: "/api/secretarias/desativar/{id}",
  summary: "Desativa uma secretaria.",
  tags: ["Secretarias"],
  request: {
    params: idParams,
  },
  responses: {
    "200": {
      description: "Secretaria desativada com sucesso.",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Secretaria desativada com sucesso." }),
          }),
        },
      },
    },
    "401": unauthorized,
    "403": notAllowed,
    "404": secretariatsNotFound,
    "409": {
      description: "Secretaria já está desativada",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "Secretaria já está desativada.",
            }),
          }),
        },
      },
    },
    "500": internalError,
  },
});
export default secretariatsRegistry;
