let editandoId = null;

async function carregarInformações() {
    const response = await fetch('http://localhost:3000/informacaoLivro');
    const informações = await response.json();

    let html = '<table><tr><th>ID</th><th>Titulo</th><th>Editora</th><th>Ano Publicação</th><th>Categoria</th>';

    informações.forEach(informacao => {
        const data = informacao.categoria.split('T')[0];
        html += `<tr id="informacao-${informacao.id}">
        <td>${informacao.id}</td>
        <td id="c-${informacao.id}-0">${informacao.titulo}</td>
        <td id="c-${informacao.id}-1">${informacao.editora}</td>
        <td id="c-${informacao.id}-2">${informacao.ano_publicacao}</td>
        <td id="c-${informacao.id}-3" data-val="${data}">${data}</td>
        <td><button class="btn-editar" onclick="editarInformação(${informacao.id})">✏️</button></td>
        </tr>`;
    });

    document.getElementById('tabelaInformacao').innerHTML = html + '</table>';
}

function editarInformação(id) {
    if (editandoId) return alert('Salve ou cancele a edição atual primeiro!');

    editandoId = id;
    document.getElementById(`c-${id}-0`).innerHTML = `<input id="i-${id}-0" value="${document.getElementById(`c-${id}-0`).textContent}">`;
    document.getElementById(`c-${id}-1`).innerHTML = `<input type="number" id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-2`).innerHTML = `<input type="number" id="i-${id}-2" value="${document.getElementById(`c-${id}-2`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-3`).innerHTML = `<input type="date" id="i-${id}-3" value="${document.getElementById(`c-${id}-3`).getAttribute('data-val')}">`;

    document.querySelector(`#informacao-${id} td:last-child`).innerHTML = `
        <button class="btn-salvar" onclick="salvarInformacao(${id})">💾</button>
        <button class="btn-cancelar" onclick="cancelarInformacao()">❌</button>`;
}

async function salvarInformação(id) {
    const response = await fetch(`http://localhost:3000/informacaoLivro/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo: document.getElementById(`i-${id}-0`).value,
            editora: document.getElementById(`i-${id}-1`).value,
            ano_publicacao: document.getElementById(`i-${id}-2`).value,
            categoria: document.getElementById(`i-${id}-3`).value
        })
    });

    if (response.ok) {
        editandoId = null;
        carregarInformacoes();
    } else {
        alert('Erro ao atualizar!');
    }
}

function cancelarEdicao() {
    editandoId = null;
    carregarInformacoes();
}

window.onload = carregarInformações;