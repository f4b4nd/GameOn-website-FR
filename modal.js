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
const closeSuccessModalBtn = document.querySelectorAll("#success-modal .close, #success-modal .btn-close") ;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", () => launchModal('#form-modal')));

// launch modal form
function launchModal(idSelector) {
    const modal = document.querySelector(idSelector) ;
    modal.style.display = "block";
}

// close modal
function closeModal(idSelector) {
    const modal = document.querySelector(idSelector) ;
    modal.style.display = "none";
}

// close modal event
closeModalBtn.addEventListener('click', () => closeModal('#form-modal')) ;
closeSuccessModalBtn.forEach(btn => btn.addEventListener('click', () => closeModal('#success-modal'))) ;

// reset form
function resetForm () {
    const form = document.querySelector('#form-modal form') ;
    form.reset() ;
}