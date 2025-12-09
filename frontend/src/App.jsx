import { useState, useEffect } from 'react';
import { Book, Plus, Trash2, X, Edit } from 'lucide-react';

function App() {
  const [livros, setLivros] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [livroEditando, setLivroEditando] = useState(null);

  const [novoLivro, setNovoLivro] = useState({
    titulo: '', autor: '', isbn: '', anoPublicacao: '', disponivel: true
  });

  const [livroEdit, setLivroEdit] = useState({
    titulo: '', autor: '', isbn: '', anoPublicacao: '', disponivel: true
  });

  const fetchLivros = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/livros');
      const data = await response.json();
      setLivros(data);
    } catch (error) { console.error("Erro ao buscar livros:", error); }
  };

  useEffect(() => { fetchLivros(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3000/api/livros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...novoLivro, anoPublicacao: Number(novoLivro.anoPublicacao) })
      });
      setIsModalOpen(false);
      setNovoLivro({ titulo: '', autor: '', isbn: '', anoPublicacao: '', disponivel: true });
      fetchLivros();
    } catch (error) { console.error("Erro ao salvar:", error); }
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      try {
        await fetch(`http://localhost:3000/api/livros/${id}`, { method: 'DELETE' });
        fetchLivros();
      } catch (error) { console.error("Erro ao deletar:", error); }
    }
  };

  const handleEdit = (livro) => {
    setLivroEditando(livro);
    setLivroEdit({
      titulo: livro.titulo,
      autor: livro.autor,
      isbn: livro.isbn,
      anoPublicacao: livro.anoPublicacao,
      disponivel: livro.disponivel
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/livros/${livroEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...livroEdit, anoPublicacao: Number(livroEdit.anoPublicacao) })
      });

      if (response.ok) {
        setIsEditModalOpen(false);
        setLivroEditando(null);
        setLivroEdit({ titulo: '', autor: '', isbn: '', anoPublicacao: '', disponivel: true });
        fetchLivros();
      } else {
        const error = await response.json();
        alert(`Erro ao editar: ${error.message}`);
      }
    } catch (error) {
      console.error("Erro ao editar:", error);
      alert('Erro ao editar livro');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="icon-box"><Book color="#5D4037" size={32} /></div>
        <div className="title"><h1>Biblioteca</h1><p>Sistema de Gerenciamento de Acervo</p></div>
      </header>

      <div className="actions-bar">
        <div><span className="stat-label">Total de Livros</span><p className="stat-number">{livros.length}</p></div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}><Plus size={20} /> Adicionar Livro</button>
      </div>

      {livros.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '4rem', color: '#A1887F' }}>
          <Book size={64} style={{ opacity: 0.2, marginBottom: '1rem' }} />
          <h2>Biblioteca Vazia</h2><p>Você não possui nenhum livro cadastrado.</p>
        </div>
      ) : (
        <div className="grid-livros">
          {livros.map((livro) => (
            <div key={livro.id} className="card">
              <div className="card-header">
                <div className="icon-box" style={{ padding: '0.5rem' }}><Book color="#5D4037" size={20} /></div>
                <span className={livro.disponivel ? "tag-disp" : "tag-indisp"}>{livro.disponivel ? "Disponível" : "Indisponível"}</span>
              </div>
              <h3>{livro.titulo}</h3>
              <p className="card-info">Autor: {livro.autor}</p>
              <p className="card-info">ISBN: {livro.isbn}</p>
              <p className="card-info">Ano: {livro.anoPublicacao}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(livro)}><Edit size={18} /></button>
                <button className="btn-delete" onClick={() => handleDelete(livro.id)}><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header"><h2>Adicionar Novo Livro</h2><button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X color="#999" /></button></div>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label>Título *</label><input required value={novoLivro.titulo} onChange={e => setNovoLivro({ ...novoLivro, titulo: e.target.value })} placeholder="Nome do livro" /></div>
              <div className="form-group"><label>Autor *</label><input required value={novoLivro.autor} onChange={e => setNovoLivro({ ...novoLivro, autor: e.target.value })} placeholder="Nome do autor" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group"><label>ISBN</label><input value={novoLivro.isbn} onChange={e => setNovoLivro({ ...novoLivro, isbn: e.target.value })} placeholder="978-..." /></div>
                <div className="form-group"><label>Ano</label><input type="number" value={novoLivro.anoPublicacao} onChange={e => setNovoLivro({ ...novoLivro, anoPublicacao: e.target.value })} placeholder="2024" /></div>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" style={{ width: 'auto' }} checked={novoLivro.disponivel} onChange={e => setNovoLivro({ ...novoLivro, disponivel: e.target.checked })} />
                <label style={{ marginBottom: 0 }}>Está disponível?</label>
              </div>
              <div className="modal-actions"><button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button><button type="submit" className="btn-primary">Salvar Livro</button></div>
            </form>
          </div>
        </div>
      )}
      {isEditModalOpen && livroEditando && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Editar Livro</h2>
              <button onClick={() => {
                setIsEditModalOpen(false);
                setLivroEditando(null);
              }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X color="#999" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Título *</label>
                <input
                  required
                  value={livroEdit.titulo}
                  onChange={e => setLivroEdit({ ...livroEdit, titulo: e.target.value })}
                  placeholder="Nome do livro"
                />
              </div>
              <div className="form-group">
                <label>Autor *</label>
                <input
                  required
                  value={livroEdit.autor}
                  onChange={e => setLivroEdit({ ...livroEdit, autor: e.target.value })}
                  placeholder="Nome do autor"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>ISBN</label>
                  <input
                    value={livroEdit.isbn}
                    onChange={e => setLivroEdit({ ...livroEdit, isbn: e.target.value })}
                    placeholder="978-..."
                  />
                </div>
                <div className="form-group">
                  <label>Ano</label>
                  <input
                    type="number"
                    value={livroEdit.anoPublicacao}
                    onChange={e => setLivroEdit({ ...livroEdit, anoPublicacao: e.target.value })}
                    placeholder="2024"
                  />
                </div>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  style={{ width: 'auto' }}
                  checked={livroEdit.disponivel}
                  onChange={e => setLivroEdit({ ...livroEdit, disponivel: e.target.checked })}
                />
                <label style={{ marginBottom: 0 }}>Está disponível?</label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => {
                  setIsEditModalOpen(false);
                  setLivroEditando(null);
                }}>Cancelar</button>
                <button type="submit" className="btn-primary">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;