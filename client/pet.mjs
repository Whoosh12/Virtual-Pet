const pet = {
  petName: '',
  petType: '',
  hunger: 66,
  dirtiness: 66,
  sleep: 66,
  happiness: 66,
  health: 100,
  healthProblems: 0,
  birthDate: '',
};
// put pet object and stat changes on server, no need for last update, change to time created, could do just date?
// the pet stats would need to be tracked twice, one server side and one client side, keep stats in the database as
// security against server going down. on loading the pet data is fetched from the database (server-side) client fetches
// the pet object from the server and starts tracking individually (or fetch everytime its needed) database can be updated
// less frequently in this case. or have a column in database that records the last update as a varchar so I dont have to
// deal with the data format nonsense.

let updateInterval;

function allowedKey(key) {
  let allowed;
  switch (key) {
    case 'hunger':
      allowed = true;
      break;

    case 'sleep':
      allowed = true;
      break;

    case 'dirtiness':
      allowed = true;
      break;

    default:
      allowed = false;
  }
  return allowed;
}

function petDeath() {
  const aliveEyes = document.querySelector(`#aliveEyes${pet.petType}`);
  aliveEyes.classList.toggle('hidden');
  const deadEyes = document.querySelector(`#deadEyes${pet.petType}`);
  deadEyes.classList.toggle('hidden');
  const petStatus = document.querySelector('#petStatus');
  petStatus.textContent = `Your ${pet.petType}, ${pet.petName}, has died. It survived for ${pet.time - Date()}`;
  pauseAnimations();
  // psql date format: 2023-03-23
  // js date format:
}

function meterCalc() {
  for (const [key, value] of Object.entries(pet)) {
    if (allowedKey(key)) {
      if (value === 0) {
        pet.healthProblems = Math.min(pet.healthProblems += 1, 3);
      } else {
        pet.healthProblems = Math.max(pet.healthProblems -= 1, 0);
      }
    }
  }
  if (pet.health === 0) {
    clearInterval(updateInterval);
    petDeath();
  }
  if (pet.healthProblems === 0) {
    pet.health += 1;
  }
  pet.hunger = Math.max(pet.hunger -= 1, 0);
  pet.dirtiness = Math.max(pet.dirtiness -= 1, 0);
  pet.sleep = Math.max(pet.sleep -= 1, 0);
  pet.health = Math.min(Math.max(pet.health -= pet.healthProblems, 0), 100);
  meterUpdater();
}

function meterUpdater() { // simplify, get rid of consts
  document.querySelector('#happiness').value = pet.happiness;
  document.querySelector('#hunger').value = pet.hunger;
  document.querySelector('#energy').value = pet.sleep;
  document.querySelector('#dirtiness').value = 100 - pet.dirtiness;
  document.querySelector('#health').value = pet.health;
  pet.happiness = (pet.dirtiness + pet.hunger + pet.sleep) / 3;
}

// function loadPet() {
//   const petStatus = document.querySelector('#petStatus');
//   petStatus.textContent = `Your ${pet.petType} is called ${pet.petName}.`;

//   const petHide = document.querySelector('#petStats');
//   petHide.classList.toggle('hidden');

//   const buttonHide = document.querySelector('#buttons');
//   buttonHide.classList.toggle('hidden');

//   const clearButton = document.querySelector('#clear');
//   clearButton.addEventListener('click', clearUpdate);

//   const petSVG = document.querySelector(`#${pet.petType}SVG`);
//   petSVG.addEventListener('mouseover', cleanPet);
//   petSVG.classList.toggle('hidden');

//   document.querySelector('#petCreate').style.display = 'none';
//   localStorage.setItem('Pet', JSON.stringify(pet));

//   updateInterval = setInterval(meterCalc, 1000); // every 504 secs (14 hours)

//   function clearUpdate() {
//     clearInterval(updateInterval);
//   }

//   setInterval(savePet, 10000); // every 150 secs
// }

function getPetId() {
  return window.location.hash.substring(1);
}

async function loadPet() {
  const id = getPetId();
  const response = await fetch(`pets/${id}`);
  let result;
  if (response.ok) {
    result = await response.json();
    console.log('Pet found');
  } else {
    console.log('pet not found');
  }

  if (result.lastUpdate !== '') {
    // compare the 2 dates, find time in between them (in seconds), adjust hunger, sleep, dirtiness and health accordingly
    // const update = new date;
  }
  console.log(result);
  pet.petName = result.petname;
  pet.petType = result.pettype;
  pet.hunger = result.hunger;
  pet.dirtiness = result.dirtiness;
  pet.sleep = result.sleep;
  pet.happiness = result.happiness;
  pet.health = result.health;
  pet.healthProblems = result.healthproblems;

  updateInterval = setInterval(meterCalc, 1000);

  function clearUpdate() {
    clearInterval(updateInterval);
  }

  setInterval(savePet, 10000);

  const petStatus = document.querySelector('#petStatus');
  petStatus.textContent = `Your ${pet.petType} is called ${pet.petName}.`;

  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', clearUpdate);

  const petSVG = document.querySelector(`#${pet.petType}SVG`);
  petSVG.addEventListener('mouseover', cleanPet);
  petSVG.classList.toggle('hidden');
  // loop through each part of the response to set the values for the pets
}


function feedPet() {
  pet.hunger = Math.min(pet.hunger += 25, 100);
}

function cleanPet() {
  pet.dirtiness = Math.min(pet.dirtiness += 2, 100);
}

function petPlay() {
  pet.sleep = Math.min(pet.sleep += 25, 100);
}

async function savePet() {
  // make function in petaccess to loop through and update values
  const id = getPetId();

  const payload = {
    id,
    hunger: pet.hunger,
    dirtiness: pet.dirtiness,
    sleep: pet.sleep,
    happiness: pet.happiness,
    health: pet.health,
    healthProblem: pet.healthProblems,
    lastUpdate: Date.now(),
  };

  console.log(payload);

  const response = await fetch(`pets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log('saved pet');
  } else {
    console.log('failed to save pet', response);
  }
}

function clearStorage() {
  clearInterval(updateInterval);
  localStorage.clear();
}

function resetStats() {
  pet.hunger = 66;
  pet.dirtiness = 66;
  pet.sleep = 66;
  pet.health = 100;
  pet.healthProblems = 0;
}

function pauseAnimations() {
  const animations = document.querySelectorAll('.animated');
  for (const animated of animations) {
    animated.style.animationPlayState = 'paused';
  }
}

function killPet() {
  pet.health = 0;
}

function init() {
  const feedButton = document.querySelector('#feed');
  feedButton.addEventListener('click', feedPet);
  const playButton = document.querySelector('#play');
  playButton.addEventListener('click', petPlay);
  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', clearStorage);
  const resetButton = document.querySelector('#reset');
  resetButton.addEventListener('click', resetStats);
  const pauseButton = document.querySelector('#pause');
  pauseButton.addEventListener('click', pauseAnimations);
  const killButton = document.querySelector('#kill');
  killButton.addEventListener('click', killPet);
  // const petStatus = document.querySelector('#petStatus');
  // petStatus.addEventListener('update', pauseAnimations);
  meterUpdater();
  loadPet();
}

init();
