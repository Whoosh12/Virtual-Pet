const pet = {
  petName: '',
  petType: '',
  food: 66,
  cleanliness: 66,
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

let updateInterval;
let cleaning = false;

function allowedKey(key) {
  let allowed;
  switch (key) {
    case 'food':
      allowed = true;
      break;

    case 'sleep':
      allowed = true;
      break;

    case 'cleanliness':
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
  clearInterval(updateInterval);
  pauseAnimations();
  petLifeSpan(pet.secondsAlive);

  function petLifeSpan(secondsAlive) {
    petStatus.textContent = `${pet.petName} was alive for `;

    if (secondsAlive >= 31536000) {
      const seconds = secondsAlive -= 31536000;
      lifeSpan.year += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 31536000 && secondsAlive >= 2628000) {
      const seconds = secondsAlive -= 2628000;
      lifeSpan.month += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 2628000 && secondsAlive >= 604800) {
      const seconds = secondsAlive -= 604800;
      lifeSpan.week += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 604800 && secondsAlive >= 86400) {
      const seconds = secondsAlive -= 86400;
      lifeSpan.day += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 86400 && secondsAlive >= 3600) {
      const seconds = secondsAlive -= 3600;
      lifeSpan.hour += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 3600 && secondsAlive >= 60) {
      const seconds = secondsAlive -= 60;
      lifeSpan.minute += 1;
      petLifeSpan(seconds);
    } else if (secondsAlive < 60 && secondsAlive > 0) {
      lifeSpan.second += 1;
      const seconds = secondsAlive -= 1;
      petLifeSpan(seconds);
    } else if (secondsAlive >= 0) {
      for (const [key, value] of Object.entries(lifeSpan)) {
        // doesnt work with === only ==
        if (key === 'second') {
          if (value > 1) {
            petStatus.textContent += `${[value]} ${[key]}s.`;
          } else if (value === 1) {
            petStatus.textContent += `${[value]} ${[key]}.`;
          }
        } else {
          if (value > 1) {
            petStatus.textContent += `${[value]} ${[key]}s, `;
          } else if (value === 1) {
            petStatus.textContent += `${[value]} ${[key]}, `;
          }
        }
      }
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
  pet.food = Math.max(pet.food -= 1, 0);
  pet.cleanliness = Math.max(pet.cleanliness -= 1, 0);
  pet.sleep = Math.max(pet.sleep -= 1, 0);
  pet.health = Math.min(Math.max(pet.health -= pet.healthProblems, 0), 100);
  pet.secondsAlive += 1;
  console.log(pet.secondsAlive);
  meterUpdater();
}

function meterUpdater() { // simplify, get rid of consts
  document.querySelector('#happiness').value = pet.happiness;
  document.querySelector('#food').value = pet.food;
  document.querySelector('#sleep').value = pet.sleep;
  document.querySelector('#cleanliness').value = pet.cleanliness;
  document.querySelector('#health').value = pet.health;
  pet.happiness = (pet.cleanliness + pet.food + pet.sleep) / 3;
}

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

  pet.petName = result.petname;
  pet.petType = result.pettype;
  pet.happiness = result.happiness;
  pet.healthProblems = result.healthproblems;
  pet.birthDate = result.birthdate;
  pet.secondsAlive = result.secondsalive;

  if (result.lastupdate !== 'A') {
    const timeDiff = Math.floor((Date.now() - result.lastupdate) / 1000);
    pet.food = result.food - timeDiff;
    pet.cleanliness = result.cleanliness - timeDiff;
    pet.sleep = result.sleep - timeDiff;
    pet.health = result.health - timeDiff;
  } else {
    pet.food = result.food;
    pet.cleanliness = result.cleanliness;
    pet.sleep = result.sleep;
    pet.health = result.health;
  }

  const petStatus = document.querySelector('#petStatus');
  petStatus.textContent = `Your ${pet.petType} is called ${pet.petName}.`;

  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', clearUpdate);

  const petSVG = document.querySelector(`#${pet.petType}SVG`);
  petSVG.addEventListener('mouseover', cleanPet);
  petSVG.classList.toggle('hidden');
  // loop through each part of the response to set the values for the pets

  updateInterval = setInterval(meterCalc, 1000);

  function clearUpdate() {
    clearInterval(updateInterval);
  }

  setInterval(savePet, 15000);
}


function feedPet() {
  pet.food = Math.min(pet.food += 25, 100);
}

function cleanPet() {
  console.log(cleaning);
  if (cleaning === true) {
    pet.cleanliness = Math.min(pet.cleanliness += 2, 100);
  }
}

function startClean() {
  cleaning = true;
  console.log(cleaning);
  setTimeout(console.log('Timer done'), 50000);
}

function petPlay() {
  pet.sleep = Math.min(pet.sleep += 25, 100);
}

async function savePet() {
  const id = getPetId();
  console.log(pet);

  const payload = {
    id,
    food: pet.food,
    cleanliness: pet.cleanliness,
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
  pet.food = 66;
  pet.cleanliness = 66;
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
}

function pauseAnimationsButton() {
  const animations = document.querySelectorAll('.animated');
  for (const animated of animations) {
    animated.style.animationPlayState = 'paused';
  }
  showOptions();
}

function killPet() {
  pet.health = 0;
  showOptions();
}

function showOptions() {
  const options = document.querySelectorAll('.options');
  for (const option of options) {
    // if (option.style.display == 'flex') {
    //   option.style.display = 'none';
    // } else {
    //   option.style.display = 'flex';
    // }
    option.classList.toggle('invisible');
  }
}

function init() {
  const feedButton = document.querySelector('#feed');
  feedButton.addEventListener('click', feedPet);
  const sleepButton = document.querySelector('#sleep');
  sleepButton.addEventListener('click', petPlay);
  const cleanButton = document.querySelector('#clean');
  cleanButton.addEventListener('click', startClean);
  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', stopTimer);
  const resetButton = document.querySelector('#reset');
  resetButton.addEventListener('click', resetStats);
  const pauseButton = document.querySelector('#pause');
  pauseButton.addEventListener('click', pauseAnimationsButton);
  const killButton = document.querySelector('#kill');
  killButton.addEventListener('click', killPet);
  const dropDownButton = document.querySelector('#btn');
  dropDownButton.addEventListener('click', showOptions);
  showOptions();
  loadPet();
}

init();
