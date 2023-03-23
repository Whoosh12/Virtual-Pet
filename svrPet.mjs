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

// function allowedKey(key) {
//   let allowed;
//   switch (key) {
//     case 'hunger':
//       allowed = true;
//       break;

//     case 'sleep':
//       allowed = true;
//       break;

//     case 'dirtiness':
//       allowed = true;
//       break;

//     default:
//       allowed = false;
//   }
//   return allowed;
// }

// export function meterCalc() {
//   for (const [key, value] of Object.entries(pet)) {
//     if (allowedKey(key)) {
//       if (value === 0) {
//         pet.healthProblems = Math.min(pet.healthProblems += 1, 3);
//       } else {
//         pet.healthProblems = Math.max(pet.healthProblems -= 1, 0);
//       }
//     }
//   }
//   if (pet.healthProblems === 0) {
//     pet.health += 1;
//   }
//   pet.hunger = Math.max(pet.hunger -= 1, 0);
//   pet.dirtiness = Math.max(pet.dirtiness -= 1, 0);
//   pet.sleep = Math.max(pet.sleep -= 1, 0);
//   pet.health = Math.min(Math.max(pet.health -= pet.healthProblems, 0), 100);
// }

// setInterval(meterCalc, 1000);
