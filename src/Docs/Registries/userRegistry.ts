import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {
  changeScheme,
  getEmployeeScheme,
  getUserScheme,
  postUserScheme,
  putErrorScheme,
  putUserScheme,
  recoveryScheme,
  redefineScheme,
  roleScheme,
  userQueryScheme,
  userScheme,
} from "../../Schemes/user.scheme";
import {
  idParams,
  internalError,
  tokenParams,
  unauthorized,
} from "../../Schemes/default.scheme";
import {
  defaultError,
  defaultOKStatus,
} from "../../Utils/Functions/docFunctions";
import { notAllowed } from "./secretariatsRegistry";

const userRegistry = new OpenAPIRegistry();

export const userNotFound = {
  description: "Usuário não encontrado",
  content: {
    "application/json": {
      schema: {},
      example: { error: "Usuário não encontrado." },
    },
  },
};

export const userCpfEmail = {
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

//get usuario
userRegistry.registerPath({
  method: "get",
  path: "/api/usuario",
  summary: "Retorna as informações do usuário logado",
  description:
    "Rota para que o front busque as informações do usuário logado de forma mais simples.",
  tags: ["Usuários"],
  responses: {
    "200": {
      description: "Retorna o objeto do usuário",
      content: {
        "application/json": { schema: userScheme },
      },
    },
    "404": userNotFound,
    "500": internalError,
  },
});

//post
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

//get
userRegistry.registerPath({
  method: "get",
  path: "/api/usuarios",
  summary: "Retorna um array com todos os usuário",
  tags: ["Usuários"],
  request: { query: userQueryScheme },
  responses: {
    "200": {
      description: "Usuário retornado com sucesso",
      content: {
        "application/json": { schema: z.array(getUserScheme) },
      },
    },
    "401": unauthorized,
    "403": notAllowed,
    "500": internalError,
  },
});

//get index
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
    "403": notAllowed,
    "404": userNotFound,
    "500": internalError,
  },
});

//delete
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
    "403": notAllowed,
    "409": defaultError(
      "Esse usuário esta vinculado a uma secretaria, não é possível deletá-lo"
    ),
    "500": internalError,
  },
});

//put
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
    "403": notAllowed,
    "404": userNotFound,
    "409": {
      description: "Conflitos na atualização",
      content: userCpfEmail,
    },
    "500": internalError,
  },
});

//troca senha
userRegistry.registerPath({
  method: "post",
  path: "/api/usuarios/trocar-senha",
  summary: "Troca a senha de um usuário",
  description:
    "Rota destinada para a troca de senha de um usuário, usuário cadastrados com google não podem ter a senha trocada.",
  tags: ["Usuários"],
  request: {
    body: {
      content: {
        "application/json": { schema: changeScheme },
      },
    },
  },
  responses: {
    "200": {
      description: "Senha alterada com sucesso",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Senha alterada com sucesso" }),
          }),
        },
      },
    },
    "400": {
      description: "Campos incorretos",
      content: {
        "application/json": { schema: putErrorScheme },
      },
    },
    "401": unauthorized,
    "403": {
      description: "Usuário autenticado com google",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "Usuário cadastrado através da autenticação com google.",
            }),
          }),
        },
      },
    },
    "404": userNotFound,
    "409": {
      description: "Compos incorretos",
      content: {
        "application/json": {
          schema: {},
          examples: {
            senhaError: {
              summary: "Senha atual",
              value: {
                error: "A senha atual inserida é incorreta.",
              },
            },
            confirmaError: {
              summary: "Confirma senha",
              value: {
                error: "Nova senha e confirma senha não coincidem.",
              },
            },
          },
        },
      },
    },
    "500": internalError,
  },
});

//troca role
userRegistry.registerPath({
  method: "post",
  path: "/api/usuarios/role/{id}",
  summary: "Troca a role de um usuário",
  description:
    "Somente usuário do tipo ADMIN podem trocar a role de outro usuário.",
  tags: ["Usuários"],
  request: {
    params: idParams,
    body: {
      content: {
        "application/json": { schema: roleScheme },
      },
    },
  },
  responses: {
    "200": defaultOKStatus("Permissão alterada com sucesso"),
    "401": unauthorized,
    "403": notAllowed,
    "404": userNotFound,
    "500": internalError,
  },
});

//get funcionario
userRegistry.registerPath({
  method: "get",
  path: "/api/usuarios/funcionarios",
  summary: "Retorna todos os funcionarios",
  description: "Rota para que o front busque todos os funcionarios.",
  tags: ["Usuários"],
  responses: {
    "200": {
      description: "Retorna um array de funcionarios",
      content: {
        "application/json": { schema: z.array(getEmployeeScheme) },
      },
    },
    "500": internalError,
  },
});

export default userRegistry;
