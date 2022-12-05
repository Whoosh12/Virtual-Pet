const pet={
    petName: '',
    petType: '',
    hunger: 33,
    dirtiness: 33,
    sleep: 33,
    happiness: 50
}

function getName(){
    const nameInput = document.querySelector('.name');
    pet.petName = nameInput.value;
    const petConfirm = document.querySelector('#petConfirm');
    petConfirm.textContent = `Your pet is called ${pet.petName}`; //make it so you can only select you name once
}

function getType(e){
    pet.petType = e.target.value;
    console.log(pet.petType);
    if(pet.petType.value == 'cat'){
            const petImage = document.createElement('img')
            petImage.src = 'catIMG.jpg' 
    }
    else if(pet.petType.value == 'dog'){
            const petImage = document.createElement('img')
            petImage.src = '.dogIMG.jpg'}
    else if(pet.petType.value == 'rabbit'){
            const petImage = document.createElement('img')
            petImage.src = 'rabbitIMG.jpg'
    }
    const petConfirm = document.querySelector('#petConfirm');
    petConfirm.textContent = petConfirm.textContent + ` and is a ${pet.petType}`; //make it so you can only select type once
}

function calcHappiness(){
    pet.happiness=(pet.dirtiness+pet.hunger+pet.sleep)/3;
    const happyMeter = document.querySelector("#happiness");
    const hungerMeter = document.querySelector("#hunger");
    const energyMeter = document.querySelector("#energy");
    const dirtMeter = document.querySelector("#dirtiness");
    happyMeter.value = pet.happiness;
    hungerMeter.value = pet.hunger;
    energyMeter.value = pet.sleep;
    dirtMeter.value = pet.dirtiness;
}

function init(){
    const nameButton = document.querySelector('.submit');
    const petSelect = document.querySelector('.select');
    let petType;
    console.log(nameButton);
    nameButton.addEventListener('click', getName);
    petSelect.addEventListener('change', getType);
    calcHappiness();
}

window.addEventListener('load', init);
