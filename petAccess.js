import config from './config.js';
import Postgres from 'pg';

const sql = new Postgres.Client(config);
sql.connect();

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});

// finds all pets
export async function findAllPets() {
  const q = 'SELECT petID, petName, petType FROM pet';
  const result = await sql.query(q);
  return result.rows;
}

// finds pet to load, need to add selector for a pet
export async function findPet(id) {
  const q = 'SELECT * FROM pet WHERE petID = $1';
  const result = await sql.query(q, [id]);
  return result.rows[0];
}

// updates pet stats
export async function savePet(pet, dbPet) {
  const q = 'UPDATE pet SET hunger = $1, dirtiness = $2, sleep = $3, happiness = $4, health = $5, healthProblems = $6, lastUpdate = $7 WHERE petID = $8';
  await sql.query(q, [pet.hunger, pet.dirtiness, pet.sleep, pet.happiness, pet.health, pet.healthProblems, Date.now(), dbPet.petID]);
}

// adds new pet
export async function newPet(pet) {
  const q = 'INSERT INTO pet (pet) VALUES ($1)';
  await sql.query(q, [pet]);
}
