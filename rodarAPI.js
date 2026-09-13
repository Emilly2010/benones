const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Criar informações do livro
app.post('/informacaoLivro', (req, res) => {
  const { id_livro, titulo, editora, ano_publicado, categoria } = req.body;

  const codigoDoMySQL = 'INSERT INTO livro (id_livro, titulo, editora, ano_publicado, categoria) VALUES (?, ?, ?, ?, ?)';

  acessaBancoNoServidor.query(codigoDoMySQL, [id_livro, titulo, editora, ano_publicado, categoria], (err, results) => {
    if (err) {
      return res.json({ error: 'Erro ao cadastrar' });
    }

    res.json({ message: 'Livro cadastrado!' });
  });
});

// Listar informações dos livros
app.get('/informacaoLivro', (req, res) => {
  const codigoDoMySQL = 'SELECT * FROM livro';

  acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
    if (err) {
      return res.json({ error: 'Erro ao buscar' });
    }

    res.json(results);
  });
});

// Deletar livro
app.delete('/informacaoLivro/:id_livro', (req, res) => {
  const id_livro = req.params.id_livro;

  const codigoDoMySQL = 'DELETE FROM livro WHERE id_livro = ?';

  acessaBancoNoServidor.query(codigoDoMySQL, [id_livro], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar livro' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    res.json({ message: 'Livro excluído com sucesso!' });
  });
});

// Atualizar livro
app.put('/informacaoLivro/:id_livro', (req, res) => {
  const id_livro = req.params.id_livro;
  const { titulo, editora, ano_publicado, categoria } = req.body;

  const codigoDoMySQL = 'UPDATE livro SET titulo = ?, editora = ?, ano_publicado = ?, categoria = ? WHERE id_livro = ?';

  acessaBancoNoServidor.query(codigoDoMySQL, [titulo, editora, ano_publicado, categoria, id_livro], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar livro' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    res.json({ message: 'Livro atualizado com sucesso!' });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});