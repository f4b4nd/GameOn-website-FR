function editNav() {
    var x = document.getElementById("myTopnav") ;
    if (x.className === "topnav") {
        x.className += " responsive" ;
    } else {
        x.className = "topnav" ;
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground") ;
const modalBtn = document.querySelectorAll(".modal-btn") ; 
const formData = document.querySelectorAll(".formData") ;
const closeModalBtn = document.querySelector("#form-modal .close") ;
const closeSuccessModalBtn = document.querySelector("#success-modal .close") ;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal
function closeModal(idSelector) {
    const modal = document.querySelector(idSelector) ;
    modal.style.display = "none";
}

// close modal event
closeModalBtn.addEventListener('click', () => closeModal('#form-modal')) ;
closeSuccessModalBtn.addEventListener('click', () => closeModal('#success-modal')) ;