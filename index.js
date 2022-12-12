const pet={
    petName: '',
    petType: '',
    hunger: 33,
    dirtiness: 33,
    sleep: 33,
    happiness: 33
}

function getPet(){
    const nameInput = document.querySelector('.name');
    const petConfirm = document.querySelector('#petConfirm');
    const petSelector = document.querySelector('.select');
    const nameButton = document.querySelector('.submit');
    const warning = document.createElement('h1');
    if(nameInput.value=='' && petSelector.value=='')
    {
        warning.textContent = 'You have not inputted a name or selected a type.';
        warning.classList.add('warning');
        document.querySelector('#petCreate').append(warning);
    }
    else if(nameInput.value=='')
    {
        warning.textContent = 'You have not inputted a name.';
        warning.classList.add('warning');
        document.querySelector('#petCreate').append(warning);
    }
    else if(petSelector.value=='')
    {
        warning.textContent = 'You have not selected a type.'
        warning.classList.add('warning');
        document.querySelector('#petCreate').append(warning);
    }
    else{
        if(document.querySelector('.warning')){
            document.querySelector('.warning').remove();
        }
        document.querySelector('#inputLabel').remove();     
        pet.petType = petSelector.value;
        pet.petName = nameInput.value;
        document.querySelector('.select').style.display = 'none';
        nameButton.style.display = 'none';
        nameInput.style.display = 'none';
        petConfirm.textContent = `Your ${pet.petType} is called ${pet.petName}.`; 
    }
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
    }
}

function init(){
    const nameButton = document.querySelector('.submit');
    const petSelect = document.querySelector('.select');
    nameButton.addEventListener('click', getPet);
    meterCalc();
    setInterval(meterUpdater, 1000);
    const feedButton=document.querySelector('#feed');
    feedButton.addEventListener('click', feedPet);
    const cat = document.querySelector('#catSVG');
    cat.addEventListener('mouseover', cleanPet);
}

window.addEventListener('load', init);
