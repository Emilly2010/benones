USE alunos_emilly;

CREATE TABLE cadastro_livro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    editora VARCHAR(100),
    ano_publicacao DATE,
    categoria VARCHAR(50)
);

SELECT * FROM cadastro_livro;