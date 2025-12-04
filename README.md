# API Web Biblioteca (Entidade Livro)

![Status](https://img.shields.io/badge/status-%20concluido-green)
![Linguagem](https://img.shields.io/badge/linguagem-TypeScript-blue)
![Backend](https://img.shields.io/badge/backend-Node.js-green)

**Disciplina:** `Arquitetura e Desenvolvimento Back-end`
**Professor:** `Danilo Farias`
**Instituição:** `Faculdade Senac`
**Período:** `2025.2`

## Objetivo

Este projeto consiste no desenvolvimento de uma **API Web backend** para um sistema de gerenciamento de biblioteca, focando na implementação das operações CRUD (Create, Read, Update, Delete) para a entidade **Livro**.

O projeto segue uma arquitetura simplificada de **Controller/Repository**, garantindo a separação de responsabilidades entre a lógica de negócio e a persistência de dados.

As principais tecnologias e práticas utilizadas foram:

* **Node.js & Express:** Framework para construção do servidor web.
* **TypeScript:** Para tipagem estática e segurança no código.
* **TypeORM:** ORM (Object Relational Mapper) para comunicação com o banco de dados.
* **SQLite:** Banco de dados relacional (escolhido pela simplicidade de configuração local).
* **Arquitetura em Camadas:** Separação entre Controllers (Lógica) e Repositories (Persistência).

## Endpoints Implementados

| Operação | Método | Rota | Descrição |
|---|---|---|---|
| **Criar** | `POST` | `/api/livros` | Cadastra um novo livro. |
| **Ler Todos** | `GET` | `/api/livros` | Retorna a lista completa de livros. |
| **Ler por ID** | `GET` | `/api/livros/{id}` | Retorna os detalhes de um livro específico. |
| **Atualizar** | `PUT` | `/api/livros/{id}` | Atualiza as informações de um livro. |
| **Excluir** | `DELETE` | `/api/livros/{id}` | Remove um livro do sistema. |

## Como Executar

Para rodar este projeto na sua máquina local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/gislanysa/bibliotecaapi.git](https://github.com/gislanysa/bibliotecaapi.git)
    ```

2.  **Entre na pasta do projeto:**
    ```bash
    cd bibliotecaapi
    ```

3.  **Instale as dependências:**
    Este passo é essencial para baixar o `express`, `typeorm` e outras bibliotecas necessárias.
    ```bash
    npm install
    ```

4.  **Inicie o servidor:**
    O banco de dados SQLite será criado automaticamente na primeira execução.
    ```bash
    npm run dev
    ```
    *O servidor iniciará na porta 3000.*

---

## Como Testar (Via Terminal)

Com o servidor rodando, você pode testar as rotas usando o `curl` em outro terminal:

**1. Cadastrar um Livro:**
```bash
curl -X POST http://localhost:3000/api/livros \
-H "Content-Type: application/json" \
-d '{"titulo": "A Paciente Silenciosa", "autor": "Alex Michaelides", "isbn": "978-8501116437", "anoPublicacao": 2019, "disponivel": true}'
```
**2. Listar Livros:**
```bash
curl http://localhost:3000/api/livros
```
**3. Atualizar um Livro:**
```bash
curl -X PUT http://localhost:3000/api/livros/ID-DO-LIVRO \
-H "Content-Type: application/json" \
-d '{"INSERIR O DADO QUE QUER ALTERAR AQUI"}'
```
**4. Deletar um Livros:**
```bash
curl -X DELETE http://localhost:3000/api/livros/1
```

