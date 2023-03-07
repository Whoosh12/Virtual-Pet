import * as db from './petAccess.js';
import express from 'express';

const app = express();
app.use(express.static('client'));

export const pet = {
  petName: '',
  petType: '',
  hunger: 66,
  dirtiness: 66,
  sleep: 66,
  happiness: 66,
  health: 100,
  healthProblems: 0,
  lastUpdate: '',
};

async function getPets(req, res) {
  res.json(await db.findAllPets());
}

async function getPet(req, res) {
  const result = await db.findPet(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('No pet found.');
  }
}

async function postPet(req, res) {
  const pets = await db.newPet(req.body.pet);
  res.json(pets);
}

async function putPet(req, res) {
  const pets = await db.savePet(req.body);
  res.json(pets);
}

// async function getPetCheck(req, res) {
//   res.json(await db.checkPet());
// }

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/pet', asyncWrap(getPets));
app.get('/pet/:id', asyncWrap(getPet));
app.post('/create', express.json(), asyncWrap(postPet));
app.put('/pet/:id', express.json(), asyncWrap(putPet));

app.listen(8080);
