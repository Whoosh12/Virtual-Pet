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
  secondsAlive: 0,
};

const lifeSpan = {
  year: 0,
  month: 0,
  week: 0,
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
};

// put pet object and stat changes on server, no need for last update, change to time created, could do just date?

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
  // const deathDate = new Date();
  const lifeSummary = petLifeSpan(pet.secondsAlive);
  const aliveEyes = document.querySelector(`#aliveEyes${pet.petType}`);
  aliveEyes.classList.toggle('hidden');
  const deadEyes = document.querySelector(`#deadEyes${pet.petType}`);
  deadEyes.classList.toggle('hidden');
  const petStatus = document.querySelector('#petStatus');
  petStatus.textContent = lifeSummary;
  console.log(petStatus);
  console.log(petStatus.textContent);
  pauseAnimations();
  // psql date format: 2023-03-23
  // js date format:

  function petLifeSpan(secondsAlive) {
    // const seconds

    console.log(secondsAlive);

    let lifeSummary = `${pet.petName} was alive for `;

    if (secondsAlive >= 31536000) {
      // do thing
      // years
      const seconds = secondsAlive -= 31536000;
      lifeSpan.year += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 31536000 && secondsAlive >= 2628000) {
      // do other thing
      // months
      const seconds = secondsAlive -= 2628000;
      lifeSpan.month += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 2628000 && secondsAlive >= 604800) {
      // do other thing again
      // weeks
      const seconds = secondsAlive -= 604800;
      lifeSpan.week += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 604800 && secondsAlive >= 86400) {
      // do other thing
      // days
      const seconds = secondsAlive -= 86400;
      lifeSpan.day += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 86400 && secondsAlive >= 3600) {
      // do other thing
      // hours
      const seconds = secondsAlive -= 3600;
      lifeSpan.hour += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 3600 && secondsAlive >= 60) {
      // do other thing
      // minutes
      const seconds = secondsAlive -= 60;
      lifeSpan.minute += 1;
      console.log(lifeSpan.minute);
      petLifeSpan(seconds);
    } else if (secondsAlive < 60 && secondsAlive > 0) {
      // do other thing
      // seconds
      lifeSpan.second += 1;
      const seconds = secondsAlive -= 1;
      console.log(lifeSpan.second);
      petLifeSpan(seconds);
    } else if (secondsAlive >= 0) {
      for (const [key, value] of Object.entries(lifeSpan)) {
        console.log([key]);
        console.log([value]);
        if ([value] >= 1) {
          lifeSummary = lifeSummary + `${[value]} ${[key]}s, `;
        }
        // else if ([value] === 1) {
        //   lifeSummary = lifeSummary + `${[value]} ${[key]}, `;
        // }
      }
      console.log(lifeSummary);
      return lifeSummary;
    }
  }
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
  pet.secondsAlive += 1;
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
  console.log(result);

  pet.petName = result.petname;
  pet.petType = result.pettype;
  pet.happiness = result.happiness;
  pet.healthProblems = result.healthproblems;
  pet.birthDate = result.birthdate;
  pet.secondsAlive = result.secondsalive;

  if (result.lastupdate !== 'A') {
    const timeDiff = Math.floor((Date.now() - result.lastupdate) / 1000);
    pet.hunger = result.hunger - timeDiff;
    pet.dirtiness = result.dirtiness - timeDiff;
    pet.sleep = result.sleep - timeDiff;
    pet.health = result.health - timeDiff;
  } else {
    pet.hunger = result.hunger;
    pet.dirtiness = result.dirtiness;
    pet.sleep = result.sleep;
    pet.health = result.health;
  }
  updateInterval = setInterval(meterCalc, 1000);

  function clearUpdate() {
    clearInterval(updateInterval);
  }

  setInterval(savePet, 15000);

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
  const id = getPetId();
  console.log(pet);

  const payload = {
    id,
    hunger: pet.hunger,
    dirtiness: pet.dirtiness,
    sleep: pet.sleep,
    happiness: pet.happiness,
    health: pet.health,
    healthProblem: pet.healthProblems,
    lastUpdate: Date.now(),
    secondsAlive: pet.secondsAlive,
  };


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

function stopTimer() {
  clearInterval(updateInterval);
  showOptions();
}

function resetStats() {
  pet.hunger = 66;
  pet.dirtiness = 66;
  pet.sleep = 66;
  pet.health = 100;
  pet.healthProblems = 0;
  showOptions();
}

function pauseAnimations() {
  const animations = document.querySelectorAll('.animated');
  for (const animated of animations) {
    animated.style.animationPlayState = 'paused';
  }
  showOptions();
}

function killPet() {
  pet.health = 0;
}

function showOptions() {
  document.querySelector('#options').classList.toggle('hidden');
}

function init() {
  const feedButton = document.querySelector('#feed');
  feedButton.addEventListener('click', feedPet);
  const playButton = document.querySelector('#play');
  playButton.addEventListener('click', petPlay);
  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', stopTimer);
  const resetButton = document.querySelector('#reset');
  resetButton.addEventListener('click', resetStats);
  const pauseButton = document.querySelector('#pause');
  pauseButton.addEventListener('click', pauseAnimations);
  const killButton = document.querySelector('#kill');
  killButton.addEventListener('click', killPet);
  // const petStatus = document.querySelector('#petStatus');
  // petStatus.addEventListener('update', pauseAnimations);
  const dropDownButton = document.querySelector('#btn');
  dropDownButton.addEventListener('click', showOptions);
  // const options = document.querySelector('#dropdown');
  // for (const option of options.children) {
  //   option.addEventListener('click', showOptions);
  // }
  meterUpdater();
  loadPet();
}

init();
