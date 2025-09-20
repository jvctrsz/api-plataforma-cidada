import express from "express";
import userRouter from "./Routes/Users/userRoutes";

const port = 3000;
const app = express();
app.use(express.json());

app.use("/api", userRouter);
app.listen(port, () => {
  console.log("servidor rodando em http://localhost:3000");
});

export default app;
