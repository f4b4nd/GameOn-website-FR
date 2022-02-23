// DOM elements
const submitModalBtn = modalbg.querySelector('[type="submit"]') ;

// DOM : form inputs
const firstNameInput = document.querySelector('#first') ;
const lastNameInput = document.querySelector('#last') ;
const emailInput = document.querySelector('#email') ;
const birthDateInput = document.querySelector('#birthdate') ;
const numberOfTournamentsInput = document.querySelector('#quantity') ;
const locationInputs = document.querySelectorAll('#location input') ;
const generalConditionsInput = document.querySelector('#generalConditions') ;
const subscribeToAlertsInput = document.querySelector('#subscribeToAlerts') ;

// inputs with error selector association
const inputsToCheck = [
    { input: firstNameInput, id: 'first', errorID: 'firstname-error', border: true },
    { input: lastNameInput, id: 'last', errorID: 'lastname-error', border: true },
    { input: emailInput, id: 'email', errorID: 'email-error', border: true },
    { input: birthDateInput, id: 'birthdate', errorID: 'birthdate-error', border: true },
    { input: numberOfTournamentsInput, id: 'quantity', errorID: 'quantity-error', border: true },
    { input: locationInputs, id: 'location', errorID: 'location-error', border: false},
    { input: generalConditionsInput, id: 'generalConditions', errorID: 'generalConditions-error', border: false },
]

// check input with regex: nom, prenom, mail, nombre de tournois
const inputsWithRegex = [
    { 
        name: 'firstname', 
        input: firstNameInput, 
        regex: /^[A-Za-z]{2,}$/gm 
    },
    { 
        name: 'lastname', 
        input: lastNameInput, 
        regex: /^[A-Za-z]{2,}$/gm 
    },
    {
        name: 'email', 
        input: emailInput, 
        regex: /^[\w-\.]+@[A-Za-z]+\.[A-Za-z]+$/gm 
    },
    { 
        name: 'number-of-tournaments', 
        input: numberOfTournamentsInput, 
        regex:  /^\d+$/gm 
    },
]

// check form when input is checked with regex
function inputsWithRegexAreValid(input, regex) {
    return input.value.match(regex) ? true : false ;
}

/// check if there is 1 location selected
function locationInputIsValid() {
    const inputs = [...locationInputs] ;
    const checkedInputs = inputs.filter(item => item.checked) ;
    return checkedInputs.length === 1 ;
}

// check if General Conditions is checked
function generalConditionsInputIsValid() {
    return generalConditionsInput.checked ;
}

// check if Birthdate is not empty
function birthdateInputIsValid() {
    return birthDateInput.value !== '' ;
}


// check all datas from form
submitModalBtn.addEventListener('click', function(e) {

    e.preventDefault() ;

    const errors = []

    // add errors with regex inputs
    inputsWithRegex.map(item => {
        if (!inputsWithRegexAreValid(item.input, item.regex))  errors.push(item.input.id) ;
    });

    // add error for location
    if (!locationInputIsValid())  errors.push('location') ;

    // add error for generalConditions
    if (!generalConditionsInputIsValid())  errors.push('generalConditions') ;

    // add error for birthdate
    if (!birthdateInputIsValid())  errors.push('birthdate') ;

    // display errors
    if (errors.length > 0) {

        inputsToCheck.map(input => {

            const element = document.querySelector('#' + input.id)
            const errorElement = document.querySelector('#' + input.errorID)

            if (errors.includes(input.id)) {
                errorElement.style.display = 'block' ;
                if (input.border) element.style.border = '1px solid red' ;
            }
            else {
                errorElement.style.display = 'none' ;
                if (input.border) element.style.border = 'none' ;
            }

        });

    }

    else {
        closeModal('#form-modal') ;
        launchModal('#success-modal') ;
        resetForm() ;
    }

})