import express from "express";

const port = 3000;
const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log("servidor rodando em http://localhost:3000");
});

export default app;
