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
const locationInputs = document.querySelectorAll('#location input');
const generalConditionsInput = document.querySelector('#generalConditions');
const subscribeToAlertsInput = document.querySelector('#subscribeToAlerts');

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

function checkFormInputsWithRegex(formInput, regex) {
    if (formInput.value.match(regex)) {
        return true
    } 
    return false
}

/// check if there is 1 location selected
function checkFormLocationInput() {
    const inputs = [...locationInputs] ;
    const checkedInputs = inputs.filter(item => item.checked) ;
    return checkedInputs.length === 1 ;
}

// check if General Conditions is checked
function checkFormGeneralConditionsInput() {
    return generalConditionsInput.checked
}

// check if Birthdate is not empty
function checkFormBirthdateInput() {
    return birthDateInput.value !== ''
}


// check all datas from form
submitModalBtn.addEventListener('click', function(e) {

    const errors = []

    const inputs = [
        { input: firstNameInput, id: 'first', errorID: 'firstname-error' },
        { input: lastNameInput, id: 'last', errorID: 'lastname-error' },
        { input: emailInput, id: 'email', errorID: 'email-error' },
        { input: birthDateInput, id: 'birthdate', errorID: 'birthdate-error' },
        { input: numberOfTournamentsInput, id: 'quantity', errorID: 'quantity-error' },
        { input: locationInputs, id: 'location', errorID: 'location-error' },
        { input: generalConditionsInput, id: 'generalConditions', errorID: 'generalConditions-error' },
    ]

    // add errors with regex inputs
    const itemsWithRegex = Object.values(regexItems) ;
    itemsWithRegex.map(item => {
        if (checkFormInputsWithRegex(item.input, item.regex) === false)  errors.push(item.input.id)
    });

    // add error for location
    if (!checkFormLocationInput())  errors.push('location');

    // add error for generalConditions
    if (!checkFormGeneralConditionsInput())  errors.push('generalConditions');

    // add error for birthdate
    if (!checkFormBirthdateInput())  errors.push('birthdate');

    if (errors.length > 0) {

        e.preventDefault();

        inputs.map(input => {
            if (errors.includes(input.id)) {
                document.querySelector('#' + input.errorID).style.display = 'block' ;
            }
            else {
                document.querySelector('#' + input.errorID).style.display = 'none' ;
            }
        });

    }

    else {
        console.log('form is valid')
    }

})


