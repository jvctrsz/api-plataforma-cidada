import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { loginScheme } from "../../Schemes/auth.scheme";
import z from "zod";
import { internalError, tokenExample } from "../../Schemes/default.scheme";

const authRegistry = new OpenAPIRegistry();

authRegistry.registerPath({
  method: "post",
  path: "/api/auth/login",
  summary: "Faz o login do usuário.",
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
      description: "Usuário cadastrado com sucesso",
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

export default authRegistry;
