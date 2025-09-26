import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import userRegistry from "./Registries/userRegistry";
import authRegistry from "./Registries/authRegistry";
import secretariatsRegistry from "./Registries/secretariatsRegistry";
import requestRegistry from "./Registries/requestRegistry";

const generator = new OpenApiGeneratorV3([
  ...authRegistry.definitions,
  ...userRegistry.definitions,
  ...secretariatsRegistry.definitions,
  ...requestRegistry.definitions,
]);

const openApiDoc = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Documentação API plataforma cidadã",
    version: "1.0.0",
  },
  security: [{ BearerAuth: [] }],
});

export const openApiDocJWT = {
  ...openApiDoc,
  components: {
    ...openApiDoc.components,
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ BearerAuth: [] }],
};

if (openApiDocJWT.paths["/api/auth/login"]?.post)
  openApiDocJWT.paths["/api/auth/login"].post.security = [];

if (openApiDocJWT.paths["/api/auth/register"]?.post)
  openApiDocJWT.paths["/api/auth/register"].post.security = [];

if (openApiDocJWT.paths["/api/auth/ativar-conta/{token}"]?.post)
  openApiDocJWT.paths["/api/auth/ativar-conta/{token}"].post.security = [];
