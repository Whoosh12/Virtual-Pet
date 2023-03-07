import { pet } from '../svr.mjs';

function createPet() { // create an el to put all query selectors in on load loop over query selector all [id]
  const nameInput = document.querySelector('#name'); // make name and ID
  const petConfirm = document.querySelector('#petConfirm');
  const petSelector = document.querySelector('#typeSelect');
  const submit = document.querySelector('#submitButton');
  if (nameInput.value === '' && petSelector.value === '') {
    petConfirm.textContent = 'You have not inputted a name or selected a type!';
    petConfirm.classList.toggle('warning');
  } else if (nameInput.value === '') {
    petConfirm.textContent = 'You have not inputted a name!';
    petConfirm.classList.toggle('warning');
  } else if (petSelector.value === ' ') {
    petConfirm.textContent = 'You have not selected a type!';
    petConfirm.classList.toggle('warning');
  } else {
    if (petConfirm.classList.contains('warning')) {
      petConfirm.classList.toggle('warning');
    }
    pet.petName = nameInput.value;
    pet.petType = petSelector.value;
    pet.time = Date();
    localStorage.setItem('Pet', JSON.stringify(pet));
    submit.href = '/pet';
  }
}

function petSaveCheck() {
  if (localStorage.getItem('Pet')) {
    const storedPet = JSON.parse(localStorage.getItem('Pet'));
    // for (const k of Object.keys(pet)) {
    //   pet.k = storedPet.k;
    // }
    for (const [key, value] of Object.entries(pet)) {
      pet[key] = storedPet[key];
    }
  }
}

function init() {
  const submitButton = document.querySelector('.submit');
  submitButton.addEventListener('click', createPet);
  petSaveCheck();
}

init();
