import express from "express";
import router from "./routes/tarefas";


const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/tarefas" ,router);

app.listen(PORT, () => {
    console.log(`Servidor executado em localhost: ${PORT}`);
});