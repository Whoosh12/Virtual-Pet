async function createPet() { // create an el to put all query selectors in on load loop over query selector all [id]
  const nameInput = document.querySelector('#name'); // make name and ID
  const petConfirm = document.querySelector('#petConfirm');
  const petSelector = document.querySelector('#typeSelect');
  // const submit = document.querySelector('#submitButton');
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

    const payload = {
      petName: nameInput.value,
      petType: petSelector.value,
    };

    console.log(payload);

    const response = await fetch('pet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('saved pet');
    } else {
      console.log('failed to save pet', response);
    }
    // submit.href = '/pet';
  }
}

function init() {
  const submitButton = document.querySelector('.submit');
  submitButton.addEventListener('click', createPet);
}

init();
