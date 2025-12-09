import { Request, Response } from "express";
import { livroRepository } from "../repository/LivroRepository";

export class LivroController {
    static async create(req: Request, res: Response) {
        try {
            const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;
            if (!titulo || !autor) {
                return res.status(400).json({
                    message: "Título e autor são obrigatórios",
                    error: "Dados inválidos"
                });
            }

            const livroData = {
                titulo: titulo.trim(),
                autor: autor.trim(),
                isbn: isbn || '',
                anoPublicacao: anoPublicacao || new Date().getFullYear(),
                disponivel: disponivel !== undefined ? disponivel : true
            };
            
            const livro = livroRepository.create(livroData);
            const savedLivro = await livroRepository.save(livro);

            return res.status(201).json(savedLivro);
        } catch (error) {
            console.error('Erro ao criar livro:', error);
            return res.status(500).json({
                message: "Erro interno do servidor",
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const livros = await livroRepository.find();
            return res.json(livros);
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
            return res.status(500).json({
                message: "Erro ao buscar livros",
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    static async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const livro = await livroRepository.findOneBy({ id: Number(id) });
            return livro ? res.json(livro) : res.status(404).json({ message: "Livro não encontrado" });
        } catch (error) {
            console.error('Erro ao buscar livro:', error);
            return res.status(500).json({
                message: "Erro ao buscar livro",
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({
                    message: "ID inválido",
                    error: "O ID deve ser um número válido"
                });
            }

            const livro = await livroRepository.findOneBy({ id: Number(id) });
            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }

            const dadosAtualizados: any = {};

            if (titulo !== undefined) {
                if (typeof titulo !== 'string' || !titulo.trim()) {
                    return res.status(400).json({
                        message: "Título não pode estar vazio",
                        error: "Dados inválidos"
                    });
                }
                dadosAtualizados.titulo = titulo.trim();
            }

            if (autor !== undefined) {
                if (typeof autor !== 'string' || !autor.trim()) {
                    return res.status(400).json({
                        message: "Autor não pode estar vazio",
                        error: "Dados inválidos"
                    });
                }
                dadosAtualizados.autor = autor.trim();
            }

            if (isbn !== undefined) {
                dadosAtualizados.isbn = isbn.trim();
            }

            if (anoPublicacao !== undefined) {
                dadosAtualizados.anoPublicacao = anoPublicacao;
            }

            if (disponivel !== undefined) {
                dadosAtualizados.disponivel = disponivel;
            }

            livroRepository.merge(livro, dadosAtualizados);
            const livroAtualizado = await livroRepository.save(livro);

            return res.json(livroAtualizado);

        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            return res.status(500).json({
                message: "Erro ao atualizar livro",
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await livroRepository.delete(id);
            return result.affected ? res.status(204).send() : res.status(404).json({ message: "Livro não encontrado" });
        } catch (error) {
            console.error('Erro ao deletar livro:', error);
            return res.status(500).json({
                message: "Erro ao deletar livro",
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }
}