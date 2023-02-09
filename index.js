const pet={
    petName: '',
    petType: '',
    hunger: 33,
    dirtiness: 33,
    sleep: 33,
    happiness: 33
}


function getPet(){ //create an el to put all query selectors in on load loop over query selector all [id]
    const nameInput = document.querySelector('.name');
    const petConfirm = document.querySelector('#petConfirm');
    const petSelector = document.querySelector('.select');
    const nameButton = document.querySelector('.submit');
    const petHide = document.querySelector('.hidden');
    if(nameInput.value=='' && petSelector.value=='')
    {
        petConfirm.textContent = 'You have not inputted a name or selected a type!';
        petConfirm.classList.toggle('warning');
    }
    else if(nameInput.value=='')
    {
        petConfirm.textContent = 'You have not inputted a name!';
        petConfirm.classList.toggle('warning');
    }
    else if(petSelector.value=='')
    {
        petConfirm.textContent = 'You have not selected a type!'
        petConfirm.classList.toggle('warning');
    }
    else{
        document.querySelector('#inputLabel').remove();     
        pet.petType = petSelector.value;
        pet.petName = nameInput.value;
        document.querySelector('.select').style.display = 'none';
        nameButton.style.display = 'none'; //put in css using class toggles
        nameInput.style.display = 'none';
        petConfirm.textContent = `Your ${pet.petType} is called ${pet.petName}.`; 
        petHide.classList.toggle('hidden');
        setInterval(meterUpdater, 1000);
        // fetch('cat.svg').then(response => response.text).then(svg => document.body.insertAdjacentHTML('afterbegin', svg));
    }
}

async function petSVG(){
    const response = await fetch('cat.svg');
    const cat = await response.json();
    const svg = document.createElement('svg');
    const pet = document.querySelector('#pet');
    svg.append(pet);
    console.log('appended');
}

function meterCalc(){
    pet.happiness=(pet.dirtiness+pet.hunger+pet.sleep)/3;
    const happyMeter = document.querySelector("#happiness"); //el class
    const hungerMeter = document.querySelector("#hunger");
    const energyMeter = document.querySelector("#energy");
    const dirtMeter = document.querySelector("#dirtiness");
    happyMeter.value = pet.happiness;
    hungerMeter.value = pet.hunger;
    energyMeter.value = pet.sleep;
    dirtMeter.value = pet.dirtiness;
}

function meterUpdater(){
    pet.hunger = Math.max(pet.hunger -= 1, 0);
        pet. dirtiness = Math.max(pet.dirtiness -= 1, 0);
        pet.sleep = Math.max(pet.sleep -= 1, 0);
        meterCalc();
}

function feedPet(){
    pet.hunger = Math.min(pet.hunger += 25, 100);
}

function cleanPet(){
    pet.dirtiness = Math.min(pet.dirtiness += 2, 100);
}

function init(){
    const nameButton = document.querySelector('.submit');
    const petSelect = document.querySelector('.select');
    nameButton.addEventListener('click', getPet);
    meterCalc();
    const feedButton=document.querySelector('#feed');
    feedButton.addEventListener('click', feedPet);
    const cat = document.querySelector('#catSVG');
    cat.addEventListener('mouseover', cleanPet);
}

window.addEventListener('load', init);
