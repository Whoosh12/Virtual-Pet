import config from './config.js';
import Postgres from 'pg';

// async function loadStats() {
//   const response = findPet();
//   const result = await response.json;
//   console.log(result);
//   // for (const [key, value] of result) {
//   //   if (key !== pet.ID && key !== pet.lastUpdate) {
//   //     pet[key] = result[key];
//   //   }
//   // }
// }

const sql = new Postgres.Client(config);
sql.connect();

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});

// finds all pets
export async function findAllPets() {
  const q = 'SELECT petID, petName, petType FROM pets;';
  const result = await sql.query(q);
  return result.rows;
}

// finds pet to load, need to add selector for a pet
export async function findPet(id) {
  const q = 'SELECT * FROM pets WHERE petID = $1';
  const result = await sql.query(q, [id]);
  return result.rows[0];
}

export async function findNewestPet() {
  const q = 'SELECT * FROM pets ORDER BY lastupdate  DESC LIMIT 1;';
  const result = await sql.query(q);
  return result.rows[0];
}

// updates pet stats
export async function savePet(pet, dbPet) {
  const q = 'UPDATE pets SET hunger = $1, dirtiness = $2, sleep = $3, happiness = $4, health = $5, healthProblems = $6, lastUpdate = $7 WHERE petID = $8';
  await sql.query(q, [pet.hunger, pet.dirtiness, pet.sleep, pet.happiness, pet.health, pet.healthProblems, Date.now(), dbPet.petID]);
}

// adds new pet
export async function newPet(pet) {
  // const petName = pet.petName;
  // const petType = pet.petType;
  const q = 'INSERT INTO pets (petname, pettype) VALUES ($1, $2)';
  await sql.query(q, [pet.petName, pet.petType]);
}

// loadStats();
