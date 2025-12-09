import { AppDataSource } from "../data-source";
import { Livro } from "../entity/Livro";

export const livroRepository = AppDataSource.getRepository(Livro);