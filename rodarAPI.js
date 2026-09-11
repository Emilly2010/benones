const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Criar informações do livro
app.post('/informacaoLivro', (req, res) => {
    const { titulo, editora, ano_publicacao, categoria  } = req.body;

    const codigoDoMySQL = 'INSERT cadastro_livro (titulo, editora, ano_publicacao, categoria ) VALUES (?, ?, ?, ?)';

    acessaBancoNoServidor.query(codigoDoMySQL, [titulo, editora, ano_publicacao, categoria ], (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao cadastrar' });
        }
        res.json({ message: 'Informações do Livro cadastradas!' });
    });
});

// Listar de informações do Livro
app.get('/informacaoLivro', (req, res) => {
    const codigoDoMySQL = 'SELECT * FROM cadastro_livro';

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao buscar' });
        }
        res.json(results);
    });
});

// Deletar Informações do Livro
app.delete('/informacaoLivro/:id', (req, res) => {
    const id = req.params.id;
    const codigoDoMySQL = 'DELETE FROM cadastro_livro WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar informações' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Informações não encontradas' });
        }

        res.json({ message: 'Informações excluídas com sucesso!' });
    });
});

// Atualizar Informações do Livro
app.put('/InformacaoLivro/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, editora, ano_publicacao, categoria } = req.body;

    const codigoDoMySQL = 'UPDATE cadastro_livro SET titulo = ?, editora = ?, ano_publicacao = ?, categoria = ? WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [titulo, editora, ano_publicacao, categoria, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar informações' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Informações não encontradas' });
        }

        res.json({ message: 'Informações atualizadas com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
