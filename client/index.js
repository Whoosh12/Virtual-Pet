// add way to replenish energy, change layout, change dirt meter colours,
// finish dog and rabbit svgs, add animations to rabbit and dog svgs, add pet customization,
// add database to store multiple pets, add way to access these multiple pets
// add some mingames, duck games esc stats
// pet will die if a stat is too low/ high for too long (36 hours?)
// fishing minigame
// comment code

const pet = {
  petName: '',
  petType: '',
  hunger: 66,
  dirtiness: 66,
  sleep: 66,
  happiness: 33,
  health: 100,
  healthProblems: 0,
};


function createPet() { // create an el to put all query selectors in on load loop over query selector all [id]
  const nameInput = document.querySelector('.name');
  const petConfirm = document.querySelector('#petConfirm');
  const petSelector = document.querySelector('.select');
  if (nameInput.value === '' && petSelector.value === '') {
    petConfirm.textContent = 'You have not inputted a name or selected a type!';
    petConfirm.classList.toggle('warning');
  } else if (nameInput.value === '') {
    petConfirm.textContent = 'You have not inputted a name!';
    petConfirm.classList.toggle('warning');
  } else if (petSelector.value === '') {
    petConfirm.textContent = 'You have not selected a type!';
    petConfirm.classList.toggle('warning');
  } else {
    if (petConfirm.classList.contains('warning')) {
      petConfirm.classList.toggle('warning');
    }
    pet.petName = nameInput.value;
    pet.petType = petSelector.value;
    localStorage.setItem('Pet', JSON.stringify(pet));
    loadPet();
  }
}

function allowedKey(key) {
  let allowed;
  switch (key) {
    case 'petName':
      allowed = false;
      break;

    case 'healthProblems':
      allowed = false;
      break;

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
      allowed = true;
  }
  return allowed;
}

function petDeath() {
  // const aliveEyes = document.querySelectorAll('#aliveEyes');
  // aliveEyes.classList.toggle('hidden');
  // const deadEyes = document.querySelectorAll('#deadEyes');
  // deadEyes.classList.toggle('hidden');
  const petConfirm = document.querySelector('#petConfirm');
  petConfirm.textContent = `Your ${pet.petType}, ${pet.petName}, has died.`;
  pauseAnimations();
}

function meterCalc() {
  for (const [key, value] of Object.entries(pet)) {
    if (value === 0 && allowedKey(key)) {
      pet.healthProblems = Math.min(pet.healthProblems += 1, 3);
    } else if (value > 0 && allowedKey(key)) {
      pet.healthProblems = Math.max(pet.healthProblems -= 1, 0);
    }
  }
  if (pet.health === 0) {
    petDeath();
  }
  if (pet.healthProblems === 0) {
    pet.health += 1;
  }
  pet.hunger = Math.max(pet.hunger -= 1, 0);
  pet.dirtiness = Math.max(pet.dirtiness -= 1, 0);
  pet.sleep = Math.max(pet.sleep -= 1, 0);
  pet.health = Math.max(pet.health -= pet.healthProblems, 0);
  // localStorage.setItem('Pet', JSON.stringify(pet)); // make this less regular, every ~5 mins
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

function loadPet() {
  const petConfirm = document.querySelector('#petConfirm');
  petConfirm.textContent = `Your ${pet.petType} is called ${pet.petName}.`;

  const petHide = document.querySelector('#petStats');
  petHide.classList.toggle('hidden');

  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', clearUpdate);

  const petSVG = document.querySelector(`#${pet.petType}SVG`);
  petSVG.addEventListener('mouseover', cleanPet);
  petSVG.classList.toggle('hidden');

  document.querySelector('#petCreate').style.display = 'none';
  localStorage.setItem('Pet', JSON.stringify(pet));

  const updateInterval = setInterval(meterCalc, 1000); // every 504 secs (14 hours)
  setInterval(savePet, 10000); // every 150 secs

  function clearUpdate() {
    clearInterval(updateInterval);
  }
}


function feedPet() {
  pet.hunger = Math.min(pet.hunger += 25, 100);
}

function cleanPet() {
  pet.dirtiness = Math.min(pet.dirtiness += 2, 100);
}

function petSaveCheck() {
  if (localStorage.getItem('Pet')) {
    const storedPet = JSON.parse(localStorage.getItem('Pet'));
    for (const [key, value] of Object.entries(pet)) {
      pet[key] = storedPet[key];
    }

    loadPet();
  }
}

function savePet() {
  localStorage.setItem('Pet', JSON.stringify(pet));
}

function clearStorage() {
  clearInterval(createPet.updateInterval);
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
  let count;
  for (let i = 0; i < 2; i++) {
    const animation = document.querySelector(`${checkAnimations()}`);
    const running = animation.style.animationPlayState === 'running';
    animation.style.animationPlayState = running ? 'paused' : 'running';
    count += 1;
  }
  function checkAnimations() {
    let animationTarget;
    switch (pet.petType) {
      case 'cat':
        animationTarget = '#catHead';
        break;

      case 'dog':
        animationTarget = '#dogTail';
        break;

      case 'rabbit':
        if (count === 0) {
          animationTarget = '#leftEar';
        } else {
          animationTarget = '#rightEar';
        }
        break;
    }
    return animationTarget;
  }
  count = 0;
}

function init() {
  const nameButton = document.querySelector('.submit');
  nameButton.addEventListener('click', createPet);
  const feedButton = document.querySelector('#feed');
  feedButton.addEventListener('click', feedPet);
  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', clearStorage);
  const resetButton = document.querySelector('#reset');
  resetButton.addEventListener('click', resetStats);
  const pauseButton = document.querySelector('#pause');
  pauseButton.addEventListener('click', pauseAnimations);
  petSaveCheck();
  meterUpdater();
}

window.addEventListener('load', init);
