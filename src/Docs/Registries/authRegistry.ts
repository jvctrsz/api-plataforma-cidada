import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { loginScheme } from "../../Schemes/auth.scheme";
import z from "zod";
import {
  internalError,
  tokenExample,
  tokenParams,
  unauthorized,
} from "../../Schemes/default.scheme";
import { postUserScheme } from "../../Schemes/user.scheme";
import { userCpfEmail, userNotFound } from "./userRegistry";

const authRegistry = new OpenAPIRegistry();

authRegistry.registerPath({
  method: "post",
  path: "/api/auth/login",
  summary: "Faz o login do usuário.",
  description:
    'Após o usuário fazer login, será retornado um token que deve ser armenazado no session storage e DEVE ser passado como "Bearer {token}" no header de cada requsição.',
  tags: ["Autenticação"],
  request: {
    body: {
      content: {
        "application/json": { schema: loginScheme },
      },
    },
  },
  responses: {
    "200": {
      description: "Usuário logado",
      content: {
        "application/json": {
          schema: z.object({
            token: z.string().openapi({ example: tokenExample }),
          }),
        },
      },
    },
    "400": {
      description: "Credenciais incorretas.",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "As credenciais informadas estão incorretas.",
            }),
          }),
        },
      },
    },
    "403": {
      description: "Erro autenticação",
      content: {
        "application/json": {
          schema: {},
          examples: {
            googleError: {
              summary: "Autenticação com google",
              value: {
                error: "Usuário cadastrado através do google.",
              },
            },
            inativoError: {
              summary: "Usuário não validado",
              value: {
                error:
                  "Usuário aguardando validação - verificar caixa de email.",
              },
            },
          },
        },
      },
    },
    "500": internalError,
  },
});

authRegistry.registerPath({
  method: "post",
  path: "/api/auth/register",
  summary: "Cria uma nova conta.",
  description:
    "Registra um novo usuário no sistema, ao ser criado a conta será enviado um email de confirmação ao usuário.",
  tags: ["Autenticação"],
  request: {
    body: {
      content: {
        "application/json": { schema: postUserScheme },
      },
    },
  },
  responses: {
    "201": {
      description: "Conta criada com sucesso",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "Usuário criado - email de confirmação enviado.",
            }),
          }),
        },
      },
    },
    "409": {
      description: "Usuário já cadastrado",
      content: userCpfEmail,
    },
    "500": internalError,
  },
});

authRegistry.registerPath({
  method: "post",
  path: "/api/auth/ativar-conta/{token}",
  summary: "Ativa a conta do usuário.",
  description:
    "Rota para ativar a conta do usuário, esse token sera enviado para o email do usuário quando ele criar a conta. Ou quando o usuário tentar fazer um login estando com a conta inativa.",
  tags: ["Autenticação"],
  request: {
    params: tokenParams,
  },
  responses: {
    "200": {
      description: "Usuário ativado com sucesso",
      content: {
        "application/json": {
          schema: z.object({
            token: z
              .string()
              .openapi({ example: "Usuário ativado com sucesso." }),
          }),
        },
      },
    },
    "404": userNotFound,
    "422": {
      description: "Token inválido.",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "Não é possível continuar, token inválido.",
            }),
          }),
        },
      },
    },
    "500": internalError,
  },
});

//google

authRegistry.registerPath({
  method: "post",
  path: "/api/auth/google/callback",
  summary: "Login/Registro com o google.",
  description:
    "O front deverá usar essa rota após o usuário ja ter feito o login e o front já ter recebido o token. Este token deve ser enviado como idToken.",
  tags: ["Autenticação"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            idToken: z.string().openapi({ example: tokenExample }),
          }),
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Usuário logado",
      content: {
        "application/json": {
          schema: z.object({
            token: z.string().openapi({ example: tokenExample }),
          }),
        },
      },
    },
    "500": {
      description: "Erros de servidor",
      content: {
        "application/json": {
          schema: {},
          examples: {
            internalError: {
              summary: "Internal Error",
              value: {
                error: "Internal Server Error!",
              },
            },
            authError: {
              summary: "Auth Error",
              value: {
                error: "Não foi possível conseguir as informações do usuário.",
              },
            },
          },
        },
      },
    },
  },
});

export default authRegistry;
