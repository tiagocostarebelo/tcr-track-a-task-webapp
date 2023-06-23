let username;

//SELECTORS
const nameInput = document.querySelector('#name');
const errorMessage = document.querySelector('.error-message');
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#new-task');
const addTaskBtn = document.querySelector('.add-task-btn');
const count = document.querySelector('.counter');  
const tasksContainer = document.querySelector('.tasks-ui'); 
const taskErrorMessage = document.querySelector('.task-error-message');

//EVENT LISTENERS
window.addEventListener('DOMContentLoaded', checkLocalStorage);
nameInput.addEventListener('blur', inputValidation);
taskForm.addEventListener('submit', inputTaskValidation);

// FUNCTIONS
function checkLocalStorage(username) {
    nameInput.value = localStorage.getItem('username');
    adjustInputWidth(nameInput.value); 
}

function setUsername(username) { 
    nameInput.style.border = "inherit";
    errorMessage.innerHTML = '';    
    localStorage.setItem('username', username); 
    checkLocalStorage(username);
}

function addNewTask(newTask) {
    console.log(newTask);
    taskInput.style.border = "inherit";
    taskErrorMessage.innerHTML = '';
    
}

function inputValidation() {
    username = nameInput.value;
    if (nameInput.value == 'name' || nameInput.value == '') {
        errorMessage.innerHTML = 'Please enter your name';
        nameInput.style.border = "1px solid #ff9900";
        nameInput.focus();   
        return false;
    } else {
        setUsername(username);
        return true;
    }
}

function inputTaskValidation(event) {
    event.preventDefault();

    newTask = taskInput.value;
    if (taskInput.value == '') {
        taskErrorMessage.innerHTML = 'Please enter a task';
        taskInput.style.border = "1px solid #ff9900";
        taskInput.addEventListener('focus', clearError);   
        return false;
    }
    taskInput.value = '';
    addNewTask(newTask);
}

function adjustInputWidth(username) {   
    const width = username.length * 9;
    nameInput.style.width = width + "px";
}

function clearError() {
    taskErrorMessage.innerHTML = '';
    taskInput.style.border = "transparent";
}