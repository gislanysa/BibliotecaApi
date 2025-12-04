import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use("/api", routes);

AppDataSource.initialize().then(() => {
    console.log("Banco SQLite conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch(error => console.log(error));