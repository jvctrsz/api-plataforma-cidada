import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import userRegistry from "./Registries/userRegistry";

const generator = new OpenApiGeneratorV3([...userRegistry.definitions]);

export const openApiDoc = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Documentação API plataforma cidadã",
    version: "1.0.0",
  },
});
