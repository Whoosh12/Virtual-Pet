    function getName()
    {
        const nameInput = document.querySelector('.name');
        const petName = nameInput.value;
        const petConfirm = document.querySelector('#petConfirm');
        petConfirm.textContent = `Your pet is called ${petName}`; //make it so you can only select you name once
        console.log(petName);
    }
    function getType(e)
    {
        const petType = e.target.value;
        console.log(petType);
        if(petType.value == 'cat')
        {
            const petImage = document.createElement('img')
            petImage.src = 'catIMG.jpg' 
        }
        else if(petType.value == 'dog')
        {
            const petImage = document.createElement('img')
            petImage.src = '.dogIMG.jpg'
        }
        else if(petType.value == 'rabbit')
        {
            const petImage = document.createElement('img')
            petImage.src = 'rabbitIMG.jpg'
        }
        const petConfirm = document.querySelector('#petConfirm');
        petConfirm.textContent = petConfirm.textContent + ` and is a ${petType}`; //make it so you can only select type once
    }

function init(){
    const nameButton = document.querySelector('.submit');
    const petSelect = document.querySelector('.select');
    let petType;
    console.log(nameButton);
    nameButton.addEventListener('click', getName);
    petSelect.addEventListener('change', getType);
}

window.addEventListener('load', init);
