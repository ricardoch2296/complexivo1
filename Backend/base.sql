CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha DATE,
    imagen TEXT
);

CREATE TABLE asistentes (
    id SERIAL PRIMARY KEY,
    evento_id INT REFERENCES eventos(id),
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);