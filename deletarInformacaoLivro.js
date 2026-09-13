async function carregarLivros() {
  const response = await fetch('http://localhost:3000/informacaoLivro');
  const livros = await response.json();

  let html = '<table><tr><th>ID</th><th>Título</th><th>Editora</th><th>Ano Publicação</th><th>Categoria</th><th>Ação</th></tr>';

  livros.forEach(livro => {
    html += `<tr id="livro-${livro.id_livro}">
      <td>${livro.id_livro}</td>
      <td>${livro.titulo}</td>
      <td>${livro.editora}</td>
      <td>${livro.ano_publicado}</td>
      <td>${livro.categoria}</td>
      <td><button class="btn-deletar" onclick="deletarLivro(${livro.id_livro})">🗑️</button></td>
    </tr>`;
  });

  html += '</table>';
  document.getElementById('tabelaLivros').innerHTML = html;
}

async function deletarLivro(id_livro) {
  if (!confirm(`Excluir livro ID ${id_livro}?`)) return;

  await fetch(`http://localhost:3000/informacaoLivro/${id_livro}`, { method: 'DELETE' });
  document.getElementById(`livro-${id_livro}`).remove();
}

window.onload = carregarLivros;