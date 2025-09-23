import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {
  postUserScheme,
  putErrorScheme,
  putUserScheme,
} from "../../Schemes/user.scheme";
import { idParams, serverScheme } from "../../Schemes/default.scheme";
extendZodWithOpenApi(z);

const userRegistry = new OpenAPIRegistry();

userRegistry.registerPath({
  method: "post",
  path: "/api/usuarios",
  summary: "Cadastra um novo usuário.",
  tags: ["Usuários"],
  request: {
    body: {
      content: {
        "application/json": { schema: postUserScheme },
      },
    },
  },
  responses: {
    "201": {
      description: "Usuário cadastrado com sucesso",
      content: {
        "application/json": { schema: postUserScheme },
      },
    },
    "409": {
      description: "Usuário já cadastrado",
      content: {
        "application/json": {
          schema: {},
          examples: {
            emailError: {
              summary: "Erro de email",
              value: {
                error: "Já existe um usuário com este email.",
              },
            },
            cpfError: {
              summary: "Erro de CPF",
              value: {
                error: "Já existe um usuário com este cpf.",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Usuário já cadastrado",
      content: {
        "application/json": {
          schema: serverScheme,
        },
      },
    },
  },
});

userRegistry.registerPath({
  method: "put",
  path: "/api/usuarios/{id}",
  summary: "Edita um usuário.",
  tags: ["Usuários"],
  request: {
    params: idParams,
    body: {
      content: {
        "application/json": { schema: postUserScheme },
      },
    },
  },
  responses: {
    "201": {
      description: "Usuário atualizado com sucesso.",
      content: {
        "application/json": { schema: putUserScheme },
      },
    },
    "400": {
      description: "Campos incorretos.",
      content: {
        "application/json": { schema: putErrorScheme },
      },
    },
    "404": {
      description: "Usuário não encontrado.",
      content: {
        "application/json": {
          schema: {},
          example: { error: "Usuário não encontrado." },
        },
      },
    },
    "409": {
      description: "Conflitos na atualização.",
      content: {
        "application/json": {
          schema: {},
          examples: {
            emailError: {
              summary: "Erro de email",
              value: {
                error: "Já existe um usuário com este email.",
              },
            },
            cpfError: {
              summary: "Erro de CPF",
              value: {
                error: "Já existe um usuário com este cpf.",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Internal Server Error.",
      content: {
        "application/json": {
          schema: serverScheme,
        },
      },
    },
  },
});

export default userRegistry;
