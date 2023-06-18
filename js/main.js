let username;

//SELECTORS
let nameInput = document.querySelector('#name');
let errorMessage = document.querySelector('.error-message');

//EVENT LISTENERS
window.addEventListener('DOMContentLoaded', checkLocalStorage);
nameInput.addEventListener('blur', inputValidation);

// FUNCTIONS
function checkLocalStorage() {
    nameInput.value = localStorage.getItem('username', username);
}

function setUsername(username) { 
    nameInput.style.backgroundColor = "transparent";
    nameInput.style.color = "inherit";
    errorMessage.innerHTML = '';
    adjustInputWidth(username); 
    localStorage.setItem('username', username); 
}


function inputValidation() {
    username = nameInput.value;
    if (nameInput.value == 'name' || nameInput.value == '') {
        errorMessage.innerHTML = 'Please enter your name';
        nameInput.style.backgroundColor = "#ff9900";
        nameInput.style.color = "white";
        nameInput.focus();   
        return false;
    } else {
        setUsername(username);
        return true;
    }
}

function adjustInputWidth(username) {   
    const width = username.length * 9;
    nameInput.style.width = width + "px";
}