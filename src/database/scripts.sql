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

INSERT INTO ghosts_types(name, description) VALUES('spirit', 'Spirits are very common ghosts. They are very powerful, but passive, only attacking when they need to. They defend their place of death to the utmost degree, killing anyone that is caught overstaying their welcome.');
INSERT INTO ghosts_evidences(ghost, evidence) VALUES
('spirit', 'emf5'),
('spirit', 'spirit box'),
('spirit', 'ghost writing');