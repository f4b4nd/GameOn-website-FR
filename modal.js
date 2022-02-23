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
const firstNameInput = document.querySelector('#first');
const lastNameInput = document.querySelector('#last');
const emailInput = document.querySelector('#email');
const birthDateInput = document.querySelector('#birthdate');
const numberOfTournamentsInput = document.querySelector('#quantity');

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
const regexEmail = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/gm ;
const regexNumberOfTournaments = /^\d+$/gm


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
    console.log(formData, regex)
    const label = formData.name
    const value = formData.value
    if (value.match(regex)) {
        console.log(value, 'is valid for', label)
    } else {
        console.log(value, 'is not a valid value for', label)
    }
}

//lastNameInput.addEventListener('change', checkFormWithRegex(regexName));

// get values from input

// redirect when clicked

// close modal