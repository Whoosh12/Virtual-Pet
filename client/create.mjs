async function createPet() {
  const nameInput = document.querySelector('#name');
  const petConfirm = document.querySelector('#petConfirm');
  const petSelector = document.querySelector('#typeSelect');
  const date = new Date();
  // changes the text of petConfirm based on if the user doesnt fill in all the required data
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

    // post request to add the new pet to the database
    const payload = {
      petName: nameInput.value,
      petType: petSelector.value,
      birthDate: date,
    };

    const response = await fetch('pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('created pet');
    } else {
      console.log('failed to create pet', response);
    }
    goToPet();
  }

  // get request to find the most recent pets ID
  async function goToPet() {
    const response = await fetch('new');
    let newPet;
    if (response.ok) {
      newPet = await response.json();
      console.log(newPet);
      window.location.href = `/pet#${newPet.petid}`;
    }
  }
}

function init() {
  const submitButton = document.querySelector('#submit');
  submitButton.addEventListener('click', createPet);
}

init();
