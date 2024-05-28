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
('spirit box', 'Only certain ghosts will talk through a Spirit Box when asked a question with your voice. Make sure the lights are turned off.'),
('suportPut', 'suportPut');

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
('yurei', 'A Yurei is a ghost that has returned to the physical world, usually for the purpose of revenge or hatred.'),
('hantu', 'A Hantu is a rare ghost that thrives in the coldest climates. The cold seems to make them more aggressive and empowered.'),
('onryo', 'The Onryo is often referred to as "The Wrathful Spirit". It steals souls from dying victims bodies to seek revenge. This ghost has been known to fear any form of fire, and will do anything to be far from it.'),
('obake', 'Obake are terrifying shape-shifters, capable of taking on many forms. They have been seen taking on humanoid shapes to attract their prey.'),
('deogen', 'Sometimes surrounded by an endless fog, Deogen have been eluding ghost hunters for years.
These ghosts have been reported to find even the most hidden prey, before stalking them into exhaustion.'),
('phantom', 'A Phantom is a ghost that can possess the living, inducing fear into those around it. They are most commonly summoned from Ouija Boards.'),
('jinn', 'A Jinn is a territorial ghost that will attack when threatened. It has also been known to be able to travel at significant speed.'),
('shade', 'A Shade is known to be very shy. There is evidence to suggest that a Shade will stop all paranormal activity if there are people nearby.'),
('oni', 'Onis love to scare their victims as much as possible before attacking. They are often seen in their physical form, guarding their place of death.'),
('goryo', 'When a Goryo passes through a DOTS projector, using a video camera is the only way to see it.'),
('the twins', 'These ghosts have been reported to mimic each others actions. They alternate their attacks to confuse their prey.'),
('the mimic', 'The Mimic is an elusive, mysterious, copycat ghost that mirrors traits and behaviours from others, including other ghost types.'),
('thaye', 'Thaye have been known to rapidly age over time, even in the afterlife. From what weve learned, they seem to deteriorate faster while within the presence of the living.'),
('suportPut', 'GarantPUT');

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
('yurei', 'ghost orb'),
('yurei', 'freezing temperatures'),
('yurei', 'd.o.t.s projector'),
('hantu', 'ghost orb'),
('hantu', 'freezing temperatures'),
('hantu', 'ultraviolet'),
('onryo', 'ghost orb'),
('onryo', 'freezing temperatures'),
('onryo', 'spirit box'),
('obake', 'ghost orb'),
('obake', 'emf5'),
('obake', 'ultraviolet'),
('deogen', 'spirit box'),
('deogen', 'ghost writing'),
('deogen', 'd.o.t.s projector'),
('phantom', 'spirit box'),
('phantom', 'ultraviolet'),
('phantom', 'd.o.t.s projector'),
('jinn', 'emf5'),
('jinn', 'ultraviolet'),
('jinn', 'freezing temperatures'),
('shade', 'emf5'),
('shade', 'ghost writing'),
('shade', 'freezing temperatures'),
('oni', 'emf5'),
('oni', 'd.o.t.s projector'),
('oni', 'freezing temperatures'),
('goryo', 'emf5'),
('goryo', 'd.o.t.s projector'),
('goryo', 'ultraviolet'),
('the twins', 'emf5'),
('the twins', 'spirit box'),
('the twins', 'freezing temperatures'),
('the mimic', 'ultraviolet'),
('the mimic', 'spirit box'),
('the mimic', 'freezing temperatures'),
('thaye', 'ghost orb'),
('thaye', 'd.o.t.s projector'),
('thaye', 'ghost writing');