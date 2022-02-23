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
const inputs = [
    { input: firstNameInput, id: 'first', errorID: 'firstname-error' },
    { input: lastNameInput, id: 'last', errorID: 'lastname-error' },
    { input: emailInput, id: 'email', errorID: 'email-error' },
    { input: birthDateInput, id: 'birthdate', errorID: 'birthdate-error' },
    { input: numberOfTournamentsInput, id: 'quantity', errorID: 'quantity-error' },
    { input: locationInputs, id: 'location', errorID: 'location-error' },
    { input: generalConditionsInput, id: 'generalConditions', errorID: 'generalConditions-error' },
]

// check input with regex: nom, prenom, mail, nombre de tournois
const itemsWithRegex = [
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
function checkFormInputsWithRegex(input, regex) {
    if (input.value.match(regex)) {
        return true ;
    } 
    return false ;
}

/// check if there is 1 location selected
function checkFormLocationInput() {
    const inputs = [...locationInputs] ;
    const checkedInputs = inputs.filter(item => item.checked) ;
    return checkedInputs.length === 1 ;
}

// check if General Conditions is checked
function checkFormGeneralConditionsInput() {
    return generalConditionsInput.checked ;
}

// check if Birthdate is not empty
function checkFormBirthdateInput() {
    return birthDateInput.value !== '' ;
}


// check all datas from form
submitModalBtn.addEventListener('click', function(e) {

    const errors = []

    // add errors with regex inputs
    itemsWithRegex.map(item => {
        if (checkFormInputsWithRegex(item.input, item.regex) === false)  errors.push(item.input.id) ;
    });

    // add error for location
    if (!checkFormLocationInput())  errors.push('location') ;

    // add error for generalConditions
    if (!checkFormGeneralConditionsInput())  errors.push('generalConditions') ;

    // add error for birthdate
    if (!checkFormBirthdateInput())  errors.push('birthdate') ;

    // display errors
    if (errors.length > 0) {

        e.preventDefault() ;

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
        closeModal('#form-modal') ;
        launchModal('#success-modal') ;
        e.preventDefault() ;
    }

})