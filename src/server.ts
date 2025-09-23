import express from "express";
import userRouter from "./Routes/userRoutes";
import authRouter from "./Routes/authRoutes";
import swaggerUi from "swagger-ui-express";
import { openApiDoc } from "./Docs/swagger";

const port = 3000;
const app = express();
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));

app.use("/api", userRouter);
app.use("/api", authRouter);

app.listen(port, () => {
  console.log("servidor rodando em http://localhost:3000");
});

export default app;
