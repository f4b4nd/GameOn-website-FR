function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = modalbg.querySelector(".close");
const submitModalBtn = modalbg.querySelector('[type="submit"]');

// DOM : form data
const firstNameInput = document.querySelector('#first');
const lastNameInput = document.querySelector('#last');
const emailInput = document.querySelector('#email');
const birthDateInput = document.querySelector('#birthdate');
const numberOfTournamentsInput = document.querySelector('#quantity');
const locationFormData = document.querySelectorAll('#location input');
const generalConditions = document.querySelector('#generalConditions');
const subscribeToAlerts = document.querySelector('#subscribeToAlerts');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal
function closeModal() {
    modalbg.style.display = "none";
}

// close modal event
closeModalBtn.addEventListener('click', closeModal);


// check input with regex: nom, prenom, mail, nombre de tournois
const regexName = /^[A-Za-z]{2,}$/gm ;
const regexEmail = /^[\w-\.]+@[A-Za-z]+\.[A-Za-z]+$/gm ;
const regexNumberOfTournaments = /^\d+$/gm

const regexItems = {
    firstname : { input: firstNameInput, regex: regexName },
    lastname : { input: lastNameInput, regex: regexName },
    email : { input: emailInput, regex: regexEmail },
    numberOfTournaments : { input: numberOfTournamentsInput, regex: regexNumberOfTournaments },
}

function checkFormInputWithRegex(formInput, regex) {
    if (formInput.value.match(regex)) {
        return true
    } 
    return false
}


/// check if there is 1 location selected
function checkFormDataLocation() {
    const listData = [...locationFormData] ;
    const checkedItems = listData.filter(item => item.checked) ;
    return checkedItems.length === 1 ? checkedItems[0] : false ;
}

// check if General Conditions is checked
function checkGeneralConditions() {
    return generalConditions.checked
}

const errorsSelectors = [
    { id: 'first', errorID: 'firstname-error' },
    { id: 'email', errorID: 'email-error' },
]

// check all datas from form
submitModalBtn.addEventListener('click', function(e) {

    const errors = []
    console.log('errors', errors)
    // inputs with regex
    const itemsWithRegex = Object.values(regexItems) ;
    itemsWithRegex.map(item => {
        if (checkFormInputWithRegex(item.input, item.regex) === false)  errors.push(item.input)
    });

    const locationIsValid = checkFormDataLocation() ? true : false ;
    const generalConditionIsValid = checkGeneralConditions() ;

    if (errors.length > 0) {
        e.preventDefault();
        errors.map(error => {
            const matchID = errorsSelectors.find(errorSelector => error.id === errorSelector.id)
            if (matchID)    document.querySelector('#' + matchID.errorID).style.display = 'block'
        });
    }
    else {
        document.querySelector('.error').style.display = 'none' ;
        console.log('All are valid') ;
    }
})

// redirect when clicked

