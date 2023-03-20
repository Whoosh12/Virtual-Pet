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

async function postPet(req, res) {
  const pets = await db.newPet(req.body);
  res.json(pets);
  console.log(req.body);
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

app.get('petStats', asyncWrap(getPets));
app.get('/petStats/:id', asyncWrap(getPet));
app.post('/pet', express.json(), asyncWrap(postPet));
app.put('/pet/:id', express.json(), asyncWrap(putPet));

app.listen(8080);
