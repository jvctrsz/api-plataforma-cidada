import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {
  getUserScheme,
  postUserScheme,
  putErrorScheme,
  putUserScheme,
} from "../../Schemes/user.scheme";
import {
  idParams,
  internalError,
  serverScheme,
  unauthorized,
} from "../../Schemes/default.scheme";
extendZodWithOpenApi(z);

const userRegistry = new OpenAPIRegistry();

const userNotFound = {
  description: "Usuário não encontrado",
  content: {
    "application/json": {
      schema: {},
      example: { error: "Usuário não encontrado." },
    },
  },
};

const userCpfEmail = {
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
};

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
    "401": unauthorized,
    "409": {
      description: "Usuário já cadastrado",
      content: userCpfEmail,
    },
    "500": internalError,
  },
});

userRegistry.registerPath({
  method: "get",
  path: "/api/usuarios",
  summary: "Retorna um array com todos os usuário",
  tags: ["Usuários"],
  responses: {
    "200": {
      description: "Usuário retornado com sucesso",
      content: {
        "application/json": { schema: z.array(getUserScheme) },
      },
    },
    "401": unauthorized,
    "500": internalError,
  },
});

userRegistry.registerPath({
  method: "get",
  path: "/api/usuarios/{id}",
  summary: "Retorna um único usuário.",
  tags: ["Usuários"],
  request: {
    params: idParams,
  },
  responses: {
    "200": {
      description: "Usuário atualizado com sucesso",
      content: {
        "application/json": { schema: z.array(getUserScheme) },
      },
    },
    "401": unauthorized,
    "404": userNotFound,
    "500": internalError,
  },
});

userRegistry.registerPath({
  method: "delete",
  path: "/api/usuarios/{id}",
  summary: "Deleta um usuário.",
  tags: ["Usuários"],
  request: {
    params: idParams,
  },
  responses: {
    "200": {
      description: "Usuário deletado com sucesso",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Usuário deletado com sucesso." }),
          }),
        },
      },
    },
    "401": unauthorized,
    "404": userNotFound,
    "500": internalError,
  },
});

userRegistry.registerPath({
  method: "put",
  path: "/api/usuarios/{id}",
  summary: "Edita um usuário",
  tags: ["Usuários"],
  request: {
    params: idParams,
    body: {
      content: {
        "application/json": { schema: putUserScheme },
      },
    },
  },
  responses: {
    "201": {
      description: "Usuário atualizado com sucesso",
      content: {
        "application/json": { schema: putUserScheme },
      },
    },
    "400": {
      description: "Campos incorretos",
      content: {
        "application/json": { schema: putErrorScheme },
      },
    },
    "401": unauthorized,
    "404": userNotFound,
    "409": {
      description: "Conflitos na atualização",
      content: userCpfEmail,
    },
    "500": internalError,
  },
});

export default userRegistry;
