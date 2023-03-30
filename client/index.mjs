// change layout, change dirt meter colours,
// finish dog and rabbit svgs, add pet customization,
// add database to store multiple pets, add way to access these multiple pets
// add some mingames, duck games esc stats
// pet will die if a stat is too low/ high for too long (36 hours?)
// comment code
// seperate js based on if it affects the client ro is just back end logic
// create a readme
// make the svgs a seperate file
// put pet attributes on server, allow for multiple pets
// time pet was alive for - important, use date function
// pet graveyard, record of all pets a player has had

const options = document.querySelector('#petSelect');

async function checkPet() {
  const response = await fetch('pets');
  let pets;
  if (response.ok) {
    pets = await response.json();
    if (pets.length >= 1) {
      loadPetOptions(pets);
    } else {
      document.querySelector('#tutorialText').textContent = 'You have no pets. Please create a new one.';
    }
  }
}

function loadPetOptions(pets) {
  options.remove(0);
  for (const pet of pets) {
    const newOpt = document.createElement('option');
    newOpt.value = pet.petid;
    newOpt.text = pet.petname + ', ' + pet.pettype;
    options.add(newOpt, null);
  }
}

function goToCreate() {
  window.location.href = '/create';
}

function goToPet() {
  if (options.checkValidity()) {
    window.location.href = `/pet#${options.value}`;
  }
  // send id to pet.mjs
}

function init() {
  const newPetButton = document.querySelector('#newPet');
  newPetButton.addEventListener('click', goToCreate);
  const selectPet = document.querySelector('#selectedPet');
  selectPet.addEventListener('click', goToPet);
  checkPet();
}

init();
