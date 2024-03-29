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

// declared globally as their related intervals are set and cleared in different functions
let updateInterval;
let bubbleInterval;
let saveInterval;

// switch case checks if the key is one of the allowed keys to change the pets health
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

// switch case to determine what message will be shown in the speech bubble
function warningText(key) {
  let dialogue;
  switch (key) {
    case 'food':
      dialogue = '.hungry';
      break;

    case 'sleep':
      dialogue = '.tired';
      break;

    case 'cleanliness':
      dialogue = '.dirty';
      break;

    default:
      dialogue = false;
  }
  return dialogue;
}

// switch case to determine what message will be shown in the speech bubble
function disasterText(key) {
  let dialogue;
  switch (key) {
    case 'food':
      dialogue = '.starving';
      break;

    case 'sleep':
      dialogue = '.fatigued';
      break;

    case 'cleanliness':
      dialogue = '.filthy';
      break;

    default:
      dialogue = false;
  }
  return dialogue;
}


function petDeath() {
  const aliveEyes = document.querySelector(`#aliveEyes${pet.petType}`);
  aliveEyes.classList.toggle('hidden');
  const deadEyes = document.querySelector(`#deadEyes${pet.petType}`);
  deadEyes.classList.toggle('hidden');
  // changes the pets eyes to an X
  const petStatus = document.querySelector('#petStatus');
  clearInterval(updateInterval);
  clearInterval(bubbleInterval);
  clearInterval(saveInterval);
  pauseAnimations();
  savePet();
  // stops the timers for stats and speech bubbles, also pauses animations for the pets
  petLifeSpan(pet.secondsAlive);

  // recursive function that displays the amount of time the pet was alive for
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

// function that updates the pets stats
function meterCalc() {
  // for loop that iterates over each object and checks if its the desired one with the allowedKey switch case function then adjusts the healthProblems attribute if any are 0
  for (const [key, value] of Object.entries(pet)) {
    if (allowedKey(key)) {
      if (value === 0) {
        pet.healthProblems = Math.min(pet.healthProblems += 1, 3);
      } else {
        pet.healthProblems = Math.max(pet.healthProblems -= 1, 0);
      }
    }
  }
  // calls the petDeath function when the pets health reaches 0 (dies)
  if (pet.health === 0) {
    clearInterval(updateInterval);
    petDeath();
  }
  // the pet gains health if the healthProblems attribute is equal to 0
  if (pet.healthProblems === 0) {
    pet.health += 1;
  }
  pet.food = Math.max(pet.food -= 1, 0);
  pet.cleanliness = Math.max(pet.cleanliness -= 1, 0);
  pet.sleep = Math.max(pet.sleep -= 1, 0);
  pet.health = Math.min(Math.max(pet.health -= pet.healthProblems, 0), 100);
  pet.secondsAlive += 1;
  meterUpdater();
}

// changes the value of the meters
function meterUpdater() {
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
  // get request on pets/${id} to get the selected pet from the database
  const id = getPetId();
  const response = await fetch(`pets/${id}`);
  let result;
  if (response.ok) {
    result = await response.json();
    console.log('Pet found');
  } else {
    console.log('pet not found');
  }

  // sets the attribute values that dont change over time
  pet.petName = result.petname;
  pet.petType = result.pettype;
  pet.happiness = result.happiness;
  pet.healthProblems = result.healthproblems;
  pet.birthDate = result.birthdate;
  pet.secondsAlive = result.secondsalive;

  // checks if the pet has just been created or not (lastupdate is set to A as default when the pet is created)
  // if its not new the time between updates is found and the pets stats are changed accordingly
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

  // displays the pets name
  const petStatus = document.querySelector('#petStatus');
  petStatus.textContent = `Your ${pet.petType} is called ${pet.petName}.`;

  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', clearUpdate);

  // displays the correct pet
  const petSVG = document.querySelector(`#${pet.petType}SVG`);
  petSVG.classList.toggle('hidden');

  // sets the intervals for each thing that needs them
  updateInterval = setInterval(meterCalc, 1000);
  bubbleInterval = setInterval(showBubble, 10000);
  saveInterval = setInterval(savePet, 15000);

  function clearUpdate() {
    clearInterval(updateInterval);
    clearInterval(bubbleInterval);
  }
}

function showBubble() {
  const bubble = document.querySelector('.bubble');
  let lines;
  // loops through each attribute and checks if any of the 3 main ones are below 33 or at 0 and shows the appropriate message in the speech bubble
  for (const [key, value] of Object.entries(pet)) {
    if (allowedKey(key)) {
      if (value === 0) {
        bubble.classList.toggle('hidden');
        lines = document.querySelectorAll(disasterText(key));
        for (const line of lines) {
          line.classList.toggle('hidden');
        }
        setTimeout(() => {
          bubble.classList.toggle('hidden');
          for (const line of lines) {
            line.classList.toggle('hidden');
          }
        }, 5000);
        return;
      } else if (value <= 33) {
        bubble.classList.toggle('hidden');
        lines = document.querySelectorAll(warningText(key));
        for (const line of lines) {
          line.classList.toggle('hidden');
        }
        setTimeout(() => {
          bubble.classList.toggle('hidden');
          for (const line of lines) {
            line.classList.toggle('hidden');
          }
        }, 5000);
        return;
      }
    }
  }
}


function feedPet() {
  pet.food = Math.min(pet.food += 25, 100);
}

function cleanPet() {
  pet.cleanliness = Math.min(pet.cleanliness += 25, 100);
}

function petPlay() {
  pet.sleep = Math.min(pet.sleep += 25, 100);
}

// saves the pet using a put request to update the database entry
async function savePet() {
  const id = getPetId();

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

// resets the stats of the pet to its defaults
function resetStats() {
  pet.food = 66;
  pet.cleanliness = 66;
  pet.sleep = 66;
  pet.health = 100;
  pet.healthProblems = 0;
  showOptions();
}

// pauses the animations of the pet
function pauseAnimations() {
  const animations = document.querySelectorAll('.animated');
  for (const animated of animations) {
    animated.style.animationPlayState = 'paused';
  }
}

// does the same as the previous function but is repeated to hide all of the dropdown options
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
    option.classList.toggle('invisible');
  }
}

// add the event listeners to all elements that need one
function init() {
  const feedButton = document.querySelector('#feed');
  feedButton.addEventListener('click', feedPet);
  const sleepButton = document.querySelector('#goToSleep');
  sleepButton.addEventListener('click', petPlay);
  const cleanButton = document.querySelector('#clean');
  cleanButton.addEventListener('click', cleanPet);
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
