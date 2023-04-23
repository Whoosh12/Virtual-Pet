// ask if they will read the readme for an alternate setup, dont know if my setup script work on MacIOS
const options = document.querySelector('#petSelect');

// get request to check if the database has any pets in it
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

// add all of the pets on the database to the select element
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
}

function init() {
  const newPetButton = document.querySelector('#newPet');
  newPetButton.addEventListener('click', goToCreate);
  const selectPet = document.querySelector('#selectedPet');
  selectPet.addEventListener('click', goToPet);
  checkPet();
}

init();
