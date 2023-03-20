DROP TABLE IF EXISTS pets;

CREATE TABLE IF NOT EXISTS pets (
    petID SERIAL PRIMARY KEY,
    petName text,
    petType text,
    hunger int DEFAULT 33,
    dirtiness int DEFAULT 33,
    sleep int DEFAULT 33,
    happiness int DEFAULT 33,
    health int DEFAULT 100,
    healthProblems int DEFAULT 0,
    lastUpdate timestamp DEFAULT now()
);