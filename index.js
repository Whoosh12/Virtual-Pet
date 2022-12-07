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
    petConfirm.textContent = petConfirm.textContent + ` and is a ${pet.petType}`;
    console.log(pet); //make it so you can only select type once
}

function meterCalc(){
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

function meterUpdater(){
    if(pet.hunger > 0){
        pet.hunger -= 1;
    }
    if(pet.dirtiness > 0){
        pet.dirtiness -= 1;
    }
    if(pet.sleep > 0){
        pet.sleep -= 1;
    }
    meterCalc();
    console.log(pet.hunger);
}

function feedPet(){
    if(pet.hunger > 75){
        pet.hunger += 100 - pet.hunger;
    }
    else{
        pet.hunger += 25;
    }
}

function cleanPet(){
    if(pet.dirtiness > 98){
        pet.dirtiness += 100 - pet.dirtiness;
    }
    else{
        pet.dirtiness += 2;
        console.log(pet.dirtiness);
    }
}

function init(){
    const nameButton = document.querySelector('.submit');
    const petSelect = document.querySelector('.select');
    let petType;
    console.log(nameButton);
    nameButton.addEventListener('click', getName);
    petSelect.addEventListener('change', getType);
    meterCalc();
    setInterval(meterUpdater, 1000);
    const feedButton=document.querySelector('#feed');
    feedButton.addEventListener('click', feedPet);
    const cat = document.querySelector('#catSVG');
    cat.addEventListener('mousemove', cleanPet);
}

window.addEventListener('load', init);
