import express from "express";
import userRouter from "./Routes/userRoutes";
import authRouter from "./Routes/authRoutes";
import swaggerUi from "swagger-ui-express";
import { openApiDocJWT } from "./Docs/swagger";
import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import cors from "cors";
import secretariatsRouter from "./Routes/secretariatsRoutes";

extendZodWithOpenApi(z);

const port = 3000;
const app = express();

app.use(
  cors({
    origin: ["https://order-control-gamma.vercel.app", "http://localhost:000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/docs",
  swaggerUi.serve,
  (swaggerUi as any).setup(openApiDocJWT, {
    customSiteTitle: "Order Control",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
    ],
  })
);

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", secretariatsRouter);

app.listen(port, () => {
  console.log("servidor rodando em http://localhost:3000");
});

export default app;
