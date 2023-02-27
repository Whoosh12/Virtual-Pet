import express from 'express';

const app = express();
app.use(express.static('client'));

// export const pet = {
//   petName: '',
//   petType: '',
//   hunger: 66,
//   dirtiness: 66,
//   sleep: 66,
//   happiness: 66,
//   health: 100,
//   healthProblems: 0,
// };


app.listen(8080);
