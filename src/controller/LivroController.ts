import { Request, Response } from "express";
import { livroRepository } from "../repository/LivroRepository";

export class LivroController {
    static async create(req: Request, res: Response) {
        const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;
        if (!titulo || !autor) return res.status(400).json({ message: "Dados inválidos" });

        const livro = livroRepository.create({ titulo, autor, isbn, anoPublicacao, disponivel });
        await livroRepository.save(livro);
        return res.status(201).json(livro);
    }

    static async getAll(req: Request, res: Response) {
        const livros = await livroRepository.find();
        return res.json(livros);
    }

    static async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const livro = await livroRepository.findOneBy({ id: Number(id) });
        return livro ? res.json(livro) : res.status(404).json({ message: "Não encontrado" });
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const livro = await livroRepository.findOneBy({ id: Number(id) });
        if (!livro) return res.status(404).json({ message: "Não encontrado" });

        livroRepository.merge(livro, req.body);
        const results = await livroRepository.save(livro);
        return res.json(results);
    }

    static async remove(req: Request, res: Response) {
        const { id } = req.params;
        const result = await livroRepository.delete(id);
        return result.affected ? res.status(204).send() : res.status(404).json({ message: "Não encontrado" });
    }
}