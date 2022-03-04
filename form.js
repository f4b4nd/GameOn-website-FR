// DOM elements
const submitModalBtn = modalbg.querySelector('[type="submit"]') ;

// DOM : form inputs
const firstNameInput = document.querySelector('#first') ;
const lastNameInput = document.querySelector('#last') ;
const emailInput = document.querySelector('#email') ;
const birthdateInput = document.querySelector('#birthdate') ;
const numberOfTournamentsInput = document.querySelector('#quantity') ;
const locationInputs = document.querySelectorAll('#location input') ;
const generalConditionsInput = document.querySelector('#generalConditions') ;

// inputs with error selector association
const inputsToCheck = [
    { input: firstNameInput, id: '#first', errorID: '#firstname-error', setBorder: true },
    { input: lastNameInput, id: '#last', errorID: '#lastname-error', setBorder: true },
    { input: emailInput, id: '#email', errorID: '#email-error', setBorder: true },
    { input: birthdateInput, id: '#birthdate', errorID: '#birthdate-error', setBorder: true },
    { input: numberOfTournamentsInput, id: '#quantity', errorID: '#quantity-error', setBorder: true },
    { input: locationInputs, id: '#location', errorID: '#location-error', setBorder: false},
    { input: generalConditionsInput, id: '#generalConditions', errorID: '#generalConditions-error', setBorder: false },
]

// check input with regex: nom, prenom, mail, nombre de tournois
const inputsWithRegex = [
    { 
        input: firstNameInput, 
        regex: /^[A-Za-z](\-|[A-Za-z])+$/gm 
    },
    { 
        input: lastNameInput, 
        regex: /^[A-Za-z](\-|[A-Za-z])+$/gm 
    },
    {
        input: emailInput, 
        regex: /^[\w-\.]+@[A-Za-z]+\.[A-Za-z]+$/gm 
    },
    { 
        input: numberOfTournamentsInput, 
        regex:  /^\d+$/gm 
    },
]

// check form when input is checked with regex
function inputsWithRegexIsValid(input, regex) {
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
    return birthdateInput.value !== '' ;
}

// reset form
function resetForm () {
    const form = document.querySelector('#form-modal form') ;
    form.reset() ;
    resetFormStyleErrors() ;
}

// reset form style
const resetFormStyleErrors = () => {
    // reset borders
    inputsToCheck.map(item => {
        if (item.setBorder && item.input.style.border)   item.input.style.border = 'none' ;
    });

    // hide errors
    const errors = document.querySelectorAll('.error') ;
    Array.from(errors).map(e => e.style.display ='none') ;
}

// check all datas from form
submitModalBtn.addEventListener('click', function(e) {

    e.preventDefault() ;

    const errors = [] ;
    
    // add errors with regex inputs
    inputsWithRegex.map(item => {
        if (!inputsWithRegexIsValid(item.input, item.regex))  errors.push('#' + item.input.id) ;
    });

    // add error for location
    if (!locationInputIsValid())  errors.push('#location') ;

    // add error for generalConditions
    if (!generalConditionsInputIsValid())  errors.push('#generalConditions') ;

    // add error for birthdate
    if (!birthdateInputIsValid())  errors.push('#birthdate') ;

    // display errors
    if (errors.length > 0) {

        inputsToCheck.map(item => {

            const errorElement = document.querySelector(item.errorID) ;

            if (errors.includes(item.id)) {
                errorElement.style.display = 'block' ;
                if (item.setBorder) item.input.style.border = '1px solid red' ;
            }
            else {
                errorElement.style.display = 'none' ;
                if (item.setBorder) item.input.style.border = 'none' ;
            }

        });

    }

    else {
        closeModal('#form-modal') ;
        launchModal('#success-modal') ;
        resetForm() ;
    }

})