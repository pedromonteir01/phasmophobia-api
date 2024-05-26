/* POSTGRESQL */

CREATE DATABASE phasmophobia;
\c phasmophobia;

CREATE TABLE ghosts_types (
    name VARCHAR(35) PRIMARY KEY,
    description TEXT
);

CREATE TABLE evidences(
    name VARCHAR(21) PRIMARY KEY,
    description TEXT
);

/* association table */

CREATE TABLE ghosts_evidences(
    id SERIAL PRIMARY KEY,
    ghost VARCHAR(35),
    evidence VARCHAR(21),
    FOREIGN KEY (ghost) REFERENCES ghosts_types(name),
    FOREIGN KEY (evidence) REFERENCES evidences(name)
);

INSERT INTO evidences(name, description) VALUES 
('emf5', 'Some Ghosts leave Electro Magnetic Fields (EMF) when they interact with things. Look out for extra strong readings that reach level 5.'), 
('ultraviolet', 'Some Ghosts have been known to leave fingerprints on objects such as doors and light switches, as well as leaving footprints after stepping in Salt. These can be revealed with a UV Light.'), 
('ghost writing', 'Some Ghosts are able to write inside of books if given the proper tools to do so.'), 
('freezing temperatures', 'All ghosts make rooms cold, however, some have been known to make the temperature drop extremely fast.'), 
('d.o.t.s projector', 'A laser grid of light that can reveal the silhouette of the ghost.'), 
('ghost orb', 'Small floating orbs of light, only visible through a camera.'), 
('spirit box', 'Only certain ghosts will talk through a Spirit Box when asked a question with your voice. Make sure the lights are turned off.');

INSERT INTO ghosts_types(name, description) VALUES('spirit', 'Spirits are very common ghosts. They are very powerful, but passive, only attacking when they need to. They defend their place of death to the utmost degree, killing anyone that is caught overstaying their welcome.');
INSERT INTO ghosts_evidences(ghost, evidence) VALUES
('spirit', 'emf5'),
('spirit', 'spirit box'),
('spirit', 'ghost writing');

INSERT INTO ghosts_types(name, description) VALUES('suportPut', 'GarantPUT');
