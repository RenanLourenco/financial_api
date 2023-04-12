CREATE TABLE receitas (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL UNIQUE,
    valor INTEGER NOT NULL CHECK (valor > 0),
    data DATE DEFAULT NOW()
)

CREATE TABLE despesas(
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL UNIQUE,
    valor INTEGER NOT NULL CHECK (valor > 0),
    data DATE DEFAULT NOW()
)

INSERT INTO despesas(descricao,valor) VALUES('teste',123);
INSERT INTO receitas(descricao,valor) VALUES('testandoReceita', 1234);

CREATE TABLE categorias (
    categoria_id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL UNIQUE,
)

INSERT INTO categorias(descricao) VALUES('Alimentação');
INSERT INTO categorias(descricao) VALUES('Saúde');
INSERT INTO categorias(descricao) VALUES('Moradia');
INSERT INTO categorias(descricao) VALUES('Transporte');
INSERT INTO categorias(descricao) VALUES('Educação');
INSERT INTO categorias(descricao) VALUES('Lazer');
INSERT INTO categorias(descricao) VALUES('Imprevistos');
INSERT INTO categorias(descricao) VALUES('Outras');

ALTER TABLE despesas
ADD COLUMN categoria_id INTEGER NOT NULL;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password BINARY(16) NOT NULL
);