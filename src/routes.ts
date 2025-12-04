import { Router } from "express";
import { LivroController } from "./controller/LivroController";

const router = Router();
router.post("/livros", LivroController.create);
router.get("/livros", LivroController.getAll);
router.get("/livros/:id", LivroController.getOne);
router.put("/livros/:id", LivroController.update);
router.delete("/livros/:id", LivroController.remove);

export default router;