document.getElementById('formInformaçãoLivro').addEventListener('submit', async function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const editora = document.getElementById('editora').value;
    const ano_publicacao = document.getElementById('ano_publicacao').value;
    const categoria = document.getElementById('categoria').value;

    const response = await fetch('http://localhost:3000/informacaoLivro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, editora, ano_publicacao, categoria })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').textContent = 'Informações do Livro cadastradas!';
        document.getElementById('formInformaçãoLivro').reset();
    } else {
        document.getElementById('message').textContent = 'Erro: ' + data.error;
    }
});


