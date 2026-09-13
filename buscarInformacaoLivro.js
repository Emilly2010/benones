async function listarTodos() {
  const buscaNoBancoDeDados = await fetch('http://localhost:3000/informacaoLivro');
  const respostaObtida = await buscaNoBancoDeDados.json();

  console.log(respostaObtida);

  let html = '<table><tr><th>ID</th><th>Título</th><th>Editora</th><th>Ano Publicação</th><th>Categoria</th></tr>';

  respostaObtida.forEach(livro => {
    html += `<tr>
      <td>${livro.id_livro}</td>
      <td>${livro.titulo}</td>
      <td>${livro.editora}</td>
      <td>${livro.ano_publicado}</td>
      <td>${livro.categoria}</td>
    </tr>`;
  });

  html += '</table>';

  document.getElementById('resultado').innerHTML = html;
}