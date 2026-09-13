let editandoId = null;

async function carregarLivros() {
  const response = await fetch('http://localhost:3000/informacaoLivro');
  const livros = await response.json();

  let html = '<table><tr><th>ID</th><th>Título</th><th>Editora</th><th>Ano Publicação</th><th>Categoria</th><th>Ação</th></tr>';

  livros.forEach(livro => {
    const data = livro.ano_publicado.split('T')[0];
    html += `<tr id="livro-${livro.id_livro}">
      <td>${livro.id_livro}</td>
      <td id="c-${livro.id_livro}-0">${livro.titulo}</td>
      <td id="c-${livro.id_livro}-1">${livro.editora}</td>
      <td id="c-${livro.id_livro}-2" data-val="${data}">${data}</td>
      <td id="c-${livro.id_livro}-3">${livro.categoria}</td>
      <td><button class="btn-editar" onclick="editarLivro(${livro.id_livro})">✏️</button></td>
    </tr>`;
  });

  document.getElementById('tabelaLivros').innerHTML = html + '</table>';
}

function editarLivro(id) {
  if (editandoId) return alert('Salve ou cancele a edição atual primeiro!');

  editandoId = id;
  document.getElementById(`c-${id}-0`).innerHTML = `<input id="i-${id}-0" value="${document.getElementById(`c-${id}-0`).textContent}">`;
  document.getElementById(`c-${id}-1`).innerHTML = `<input id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}">`;
  document.getElementById(`c-${id}-2`).innerHTML = `<input type="date" id="i-${id}-2" value="${document.getElementById(`c-${id}-2`).getAttribute('data-val')}">`;
  document.getElementById(`c-${id}-3`).innerHTML = `<input id="i-${id}-3" value="${document.getElementById(`c-${id}-3`).textContent}">`;

  document.querySelector(`#livro-${id} td:last-child`).innerHTML = `
    <button class="btn-salvar" onclick="salvarLivro(${id})">💾</button>
    <button class="btn-cancelar" onclick="cancelarEdicao()">❌</button>`;
}

async function salvarLivro(id) {
  const response = await fetch(`http://localhost:3000/informacaoLivro/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      titulo: document.getElementById(`i-${id}-0`).value,
      editora: document.getElementById(`i-${id}-1`).value,
      ano_publicado: document.getElementById(`i-${id}-2`).value,
      categoria: document.getElementById(`i-${id}-3`).value
    })
  });

  if (response.ok) {
    editandoId = null;
    carregarLivros();
  } else {
    alert('Erro ao atualizar!');
  }
}

function cancelarEdicao() {
  editandoId = null;
  carregarLivros();
}

window.onload = carregarLivros;