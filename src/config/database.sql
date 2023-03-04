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