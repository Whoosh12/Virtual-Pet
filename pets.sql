DROP TABLE IF EXISTS pets;

CREATE TABLE IF NOT EXISTS pets {
    petID SERIAL PRIMARY KEY,
    petName text,
    petType text,
    hunger int,
    dirtiness int,
    sleep int,
    happiness int,
    health int,
    healthProblems int,
    lastUpdate timestamp DEFAULT now()
}