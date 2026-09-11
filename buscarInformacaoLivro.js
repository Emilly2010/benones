async function listarTodos() {
    const buscaNoBancoDeDados = await fetch('http://localhost:3000/informacaoLivro');
    const respostaObtida = await buscaNoBancoDeDados.json();
    console.log(respostaObtida);
     let html = '<table><tr><th>ID</th><th>Titulo</th><th>Editora</th><th>Ano Publicação</th><th>Categoria</th>';

    respostaObtida.forEach(informacaLivro => {
        html += `<tr>
        <td>${informacaoLivro.id}</td>
        <td>${informacaoLivro.titulo}</td>
        <td>${informacaoLivro.editora}</td>
        <td>${informacaoLivro.ano_publicacao}</td>
        <td>${informacaoLivro.categoria}</td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('resultado').innerHTML = html;
}
