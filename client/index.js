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
  hunger: 33,
  dirtiness: 33,
  sleep: 33,
  happiness: 33,
  saved: false,
};


function createPet() { // create an el to put all query selectors in on load loop over query selector all [id]
  const nameInput = document.querySelector('.name');
  const petConfirm = document.querySelector('#petConfirm');
  const petSelector = document.querySelector('.select');
  const petHide = document.querySelector('#petStats');
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
    const stopInterval = function clearUpdate() {
      clearInterval(updateInterval);
    };
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', stopInterval);
    pet.petType = petSelector.value;
    pet.petName = nameInput.value;
    document.querySelector('#petCreate').style.display = 'none';
    petConfirm.textContent = `Your ${pet.petType} is called ${pet.petName}.`;
    petHide.classList.toggle('hidden');
    const petSVG = document.querySelector(`#${pet.petType}SVG`);
    petSVG.classList.toggle('hidden');
    localStorage.setItem('Pet', JSON.stringify(pet));
    const updateInterval = setInterval(meterUpdater, 1000); // every 504 secs (14 hours)
  }
}

function meterCalc() { // simplify, get rid of consts
  pet.happiness = ((100 - pet.dirtiness) + pet.hunger + pet.sleep) / 3;
  const happyMeter = document.querySelector('#happiness'); // el class
  const hungerMeter = document.querySelector('#hunger');
  const energyMeter = document.querySelector('#energy');
  const dirtMeter = document.querySelector('#dirtiness');
  happyMeter.value = pet.happiness;
  hungerMeter.value = pet.hunger;
  energyMeter.value = pet.sleep;
  dirtMeter.value = pet.dirtiness;
}

function loadPet() {
  const petConfirm = document.querySelector('#petConfirm');
  const petHide = document.querySelector('#petStats');
  const clearButton = document.querySelector('#clear');
  const petSVG = document.querySelector(`#${pet.petType}SVG`);
  clearButton.addEventListener('click', clearUpdate);
  document.querySelector('#petCreate').style.display = 'none';
  petConfirm.textContent = `Your ${pet.petType} is called ${pet.petName}`;
  petHide.classList.toggle('hidden');
  petSVG.classList.toggle('hidden');
  localStorage.setItem('Pet', JSON.stringify(pet));
  const updateInterval = setInterval(meterUpdater, 1000); // every 504 secs (14 hours)
  function clearUpdate() {
    clearInterval(updateInterval);
  }
}

function meterUpdater() {
  pet.hunger = Math.max(pet.hunger -= 1, 0);
  pet.dirtiness = Math.max(pet.dirtiness += 1, 0);
  pet.sleep = Math.max(pet.sleep -= 1, 0);
  localStorage.setItem('Pet', JSON.stringify(pet)); // make this less regular, every ~5 mins
  meterCalc();
}

function feedPet() {
  pet.hunger = Math.min(pet.hunger += 25, 100);
}

function cleanPet() {
  pet.dirtiness = Math.min(pet.dirtiness -= 2, 100);
}

function petSaveCheck() {
  if (localStorage.getItem('Pet')) {
    const storedPet = JSON.parse(localStorage.getItem('Pet'));
    pet.petName = storedPet.petName;
    pet.petType = storedPet.petType;
    pet.hunger = storedPet.hunger;
    pet.sleep = storedPet.sleep;
    pet.dirtiness = storedPet.dirtiness;
    pet.happiness = storedPet.happiness;
    loadPet();
  }
}

function clearStorage() {
  clearInterval(createPet.updateInterval);
  localStorage.clear();
}

function init() {
  const nameButton = document.querySelector('.submit');
  // const petSelect = document.querySelector('.select');
  nameButton.addEventListener('click', createPet);
  meterCalc();
  const feedButton = document.querySelector('#feed');
  feedButton.addEventListener('click', feedPet);
  const cat = document.querySelector('#catSVG');
  cat.addEventListener('mouseover', cleanPet);
  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', clearStorage);
  petSaveCheck();
}

window.addEventListener('load', init);
