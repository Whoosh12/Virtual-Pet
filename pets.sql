DROP TABLE IF EXISTS pets;

CREATE TABLE IF NOT EXISTS pets (
    petID SERIAL PRIMARY KEY,
    petName text,
    petType text,
    food int DEFAULT 66,
    cleanliness int DEFAULT 66,
    sleep int DEFAULT 66,
    happiness decimal DEFAULT 66,
    health int DEFAULT 100,
    healthProblems int DEFAULT 0,
    lastUpdate VARCHAR(25) DEFAULT 'A',
    birthDate date,
    secondsAlive int DEFAULT 0
);