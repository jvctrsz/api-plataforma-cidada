import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {
  changeScheme,
  getUserScheme,
  postUserScheme,
  putErrorScheme,
  putUserScheme,
  recoveryScheme,
  redefineScheme,
} from "../../Schemes/user.scheme";
import {
  idParams,
  internalError,
  tokenParams,
  unauthorized,
} from "../../Schemes/default.scheme";

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

//recupera senha
userRegistry.registerPath({
  method: "post",
  path: "/api/usuarios/recuperar-senha",
  summary: "Recupera a senha de um usuário",
  description:
    "Rota destinada para a recuperação da senha de um usuário. Deve ser utilizada no momento que o usuário clicar em esqueceu a senha. Será enviado um email com o link de recuperação para o usuário e após o usuário confirmar a recuperação em seu email, ele sera redirecionado para uma rota escolhida pelo front, e passará um token como parametro.",
  tags: ["Usuários"],
  request: {
    body: {
      content: {
        "application/json": { schema: recoveryScheme },
      },
    },
  },
  responses: {
    "200": {
      description: "Link enviado com sucesso",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Link de recuperação enviado com sucesso." }),
          }),
        },
      },
    },
    "404": userNotFound,
    "500": internalError,
  },
});

//redefinir senha
userRegistry.registerPath({
  method: "post",
  path: "/api/usuarios/redefinir-senha/{token}",
  summary: "Redefine a senha de um usuário",
  description:
    "Rota destinada para redefinir a senha de um usuário. Esta rota será utilizada após a rota de 'Recuperar Senha'. Recebe como parametro um token JWT.",
  tags: ["Usuários"],
  request: {
    params: tokenParams,
    body: {
      content: {
        "application/json": { schema: redefineScheme },
      },
    },
  },
  responses: {
    "200": {
      description: "Senha alterada com sucesso.",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Senha alterada com sucesso." }),
          }),
        },
      },
    },
    "400": {
      description: "Token inválido",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "Nova senha e confirma senha não coincidem.",
            }),
          }),
        },
      },
    },
    "404": userNotFound,
    "410": {
      description: "Token inválido",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "Não foi possível continuar, token inválido.",
            }),
          }),
        },
      },
    },
    "500": internalError,
  },
});

export default userRegistry;
