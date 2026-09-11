async function carregarInfomações() {
    const response = await fetch('http://localhost:3000/informacaoLivro');
    const informações = await response.json();

    let html = '<table><tr><th>ID</th><th>Titulo</th><th>Editora</th><th>Ano Publicação</th><th>Categoria</th>';

    informações.forEach(informação => {
        html += `<tr id="venda-${venda.id}">
        <td>${informação.id}</td>
        <td>${informação.titulo}</td>
        <td>${informação.editora}</td>
        <td>${informação.ano_publicacao}</td>
        <td>${informação.categoria}</td>
        <td><button class="btn-deletar" onclick="deletarInformação(${informação.id})">🗑️</button></td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('tabelaInformações').innerHTML = html;
}

async function deletarInformação(id) {
    if (!confirm(`Excluir informações ID ${id}?`)) return;

    await fetch(`http://localhost:3000/informacaoLivro/${id}`, { method: 'DELETE' });
    document.getElementById(`informação-${id}`).remove();
}

window.onload = carregarInformações();
