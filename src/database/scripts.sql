/* POSTGRESQL */

CREATE DATABASE phasmophobia;
\c phasmophobia;

CREATE TABLE ghosts_types (
    name VARCHAR(35) PRIMARY KEY,
    description TEXT
);

CREATE TABLE evidences(
    name VARCHAR(21) PRIMARY KEY
);

/* association table */

CREATE TABLE ghosts_evidences(
    ghost VARCHAR(35),
    evidence VARCHAR(21),
    PRIMARY KEY (ghost, evidence),
    FOREIGN KEY (ghost) REFERENCES ghosts_types(name),
    FOREIGN KEY (evidence) REFERENCES evidences(name)
);

INSERT INTO evidences(name) VALUES 
('emf5'), 
('ultraviolet'), 
('ghost writing'), 
('freezing temperatures'), 
('d.o.t.s projector'), 
('ghost orb'), 
('spirit box');