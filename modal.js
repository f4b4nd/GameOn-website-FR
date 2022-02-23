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

// FORM Datta
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
    firstname : { selector: firstNameInput, regex: regexName },
    lastname : { selector: lastNameInput, regex: regexName },
    email : { selector: emailInput, regex: regexEmail },
    numberOfTournaments : { selector: numberOfTournamentsInput, regex: regexNumberOfTournaments },
}

firstNameInput.addEventListener('change', function () {
    checkFormDataWithRegex(this, regexName)
});

lastNameInput.addEventListener('change', function () {
    checkFormDataWithRegex(this, regexName)
});

emailInput.addEventListener('change', function () {
    checkFormDataWithRegex(this, regexEmail)
});

numberOfTournamentsInput.addEventListener('change', function () {
    checkFormDataWithRegex(this, regexNumberOfTournaments)
});

function checkFormDataWithRegex(formData, regex) {
    const label = formData.name
    const value = formData.value
    if (value.match(regex)) {
        //console.log(value, 'is valid for', label)
        return true
    } 
    //console.log(value, 'is not a valid value for', label)
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

// check all datas from form
submitModalBtn.addEventListener('click', function(e) {
    e.preventDefault();

    // inputs with regex
    const inputsWithRegex = Object.values(regexItems) ;
    const checkedInputsWithRegex = inputsWithRegex.filter(item => checkFormDataWithRegex(item.selector, item.regex)) ;

    const regexInputsAreValid = checkedInputsWithRegex.length === inputsWithRegex.length ;
    const locationIsValid = checkFormDataLocation() ? true : false ;
    const generalConditionIsValid = checkGeneralConditions()

    if (regexInputsAreValid && locationIsValid && generalConditionIsValid) {
        console.log('All are valid', regexInputsAreValid, locationIsValid, generalConditionIsValid)
    }
    else {
        console.log('Something is missing', regexInputsAreValid, locationIsValid, generalConditionIsValid)
    }
})

// redirect when clicked

// close modal