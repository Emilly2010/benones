document.getElementById('formLivro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const id_livro = document.getElementById('id_livro').value;
  const titulo = document.getElementById('titulo').value;
  const editora = document.getElementById('editora').value;
  const ano_publicado = document.getElementById('ano_publicado').value;
  const categoria = document.getElementById('categoria').value;

  const response = await fetch('http://localhost:3000/informacaoLivro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_livro,
      titulo,
      editora,
      ano_publicado,
      categoria
    })
  });

  const data = await response.json();

  if (response.ok) {
    document.getElementById('message').textContent = 'Livro cadastrado!';
    document.getElementById('formLivro').reset();
  } else {
    document.getElementById('message').textContent = 'Erro: ' + data.error;
  }
});