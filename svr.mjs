import * as db from './petAccess.js';
import express from 'express';

const app = express();
app.use(express.static('client', { extensions: ['html'] }));

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

async function getNewPet(req, res) {
  res.json(await db.findNewestPet());
}

async function postPet(req, res) {
  const pets = await db.newPet(req.body);
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

app.get('/pets', asyncWrap(getPets));
app.get('/pets/:id', asyncWrap(getPet));
app.get('/new', asyncWrap(getNewPet));
app.post('/pets', express.json(), asyncWrap(postPet));
app.put('/pets/:id', express.json(), asyncWrap(putPet));

app.listen(8080);
