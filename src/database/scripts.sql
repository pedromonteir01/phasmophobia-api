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
('suportPut', 'suportPut');

INSERT INTO ghosts_types(name, description) VALUES('', '');

INSERT INTO ghosts_types(name, description) VALUES('spirit', 'Spirits are very common ghosts. They are very powerful, but passive, only attacking when they need to. They defend their place of death to the utmost degree, killing anyone that is caught overstaying their welcome.'),
('poltergeist', 'One of the most famous ghosts, the Poltergeist. Known to manipulate objects around it to spread fear into its victims.'),
('mare', 'A Mare is the source of all nightmares, making it most powerful in the dark.'),
('demon', 'A Demon is one of the worst ghosts you can encounter. It has been known to attack without reason.'),
('yokai', 'Yokai are common ghosts that are attracted to human voices. They can usually be found haunting family homes.'),
('myling', 'A Myling is a very vocal and active ghost. They are rumoured to be quiet when hunting their prey.'),
('raiju', 'A Raiju is a demon that thrives on electrical current. While generally calm, they can become agitated when overwhelmed with power.'),
('moroi', 'Moroi have risen from the grave to drain energy from the living. They have been known to place curses on their victims, curable only by antidotes or moving very far away.'),
('wraith', 'Wraiths are one of the most dangerous ghosts you will find. It is also the only known ghost that has the ability of flight and has sometimes been known to travel through walls.'),
('banshee', 'The singing siren, known for attracting its victims through song. It has been known to single out its prey before making a killing blow.'),
('revenant', 'A Revenant is a violent ghost that will attack indiscriminately. Their speed can be deceiving, as they are slow while dormant; however, as soon as they hunt they can move incredibly fast.'),


INSERT INTO ghosts_evidences(ghost, evidence) VALUES
('spirit', 'emf5'),
('spirit', 'spirit box'),
('spirit', 'ghost writing'),
('poltergeist', 'spirit box'),
('poltergeist', 'ghost writing'),
('poltergeist', 'ultraviolet'),
('mare', 'spirit box'),
('mare', 'ghost writing'),
('mare', 'ghost orb'),
('demon', 'ultraviolet'),
('demon', 'ghost writing'),
('demon', 'freezing temperatures'),
('yokai', 'spirit box'),
('yokai', 'ghost orb'),
('yokai', 'd.o.t.s projector'),
('myling', 'emf5'),
('myling', 'ultraviolet'),
('myling', 'ghost writing'),
('raiju', 'emf5'),
('raiju', 'ghost orb'),
('raiju', 'd.o.t.s projector'),
('moroi', 'spirit box'),
('moroi', 'ghost writing'),
('moroi', 'freezing temperatures'),
('wraith', 'spirit box'),
('wraith', 'emf5'),
('wraith', 'd.o.t.s projector'),
('banshee', 'ultraviolet'),
('banshee', 'ghost orb'),
('banshee', 'd.o.t.s projector'),
('revenant', 'ghost writing'),
('revenant', 'ghost orb'),
('revenant', 'freezing temperatures'),


INSERT INTO ghosts_types(name, description) VALUES('suportPut', 'GarantPUT');
