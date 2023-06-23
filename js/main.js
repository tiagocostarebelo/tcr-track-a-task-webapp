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
function checkLocalStorage() {
    nameInput.value = localStorage.getItem('username');
    adjustInputWidth(nameInput.value);
    tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => updateUi(task));
}

function setUsername(username) { 
    nameInput.style.border = "inherit";
    errorMessage.innerHTML = '';    
    localStorage.setItem('username', username); 
    checkLocalStorage(username);
}

function addNewTask(newTask) {    
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateUi(newTask);
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

function updateUi(parameter) {
    const fragment = document.createDocumentFragment();
    const newDiv = document.createElement("div");
    const newP = document.createElement("input");
    const newEditBtn = document.createElement("button");
    const newDeleteBtn = document.createElement("button");
    newDiv.setAttribute('class', 'task-container');
    newP.setAttribute('class', 'task-name');
    newP.setAttribute("readonly", true);
    newP.setAttribute("value", parameter);   
    newEditBtn.setAttribute("type", "submit");
    // newEditBtn.innerHTML= "Edit";
    newEditBtn.setAttribute('class', 'btn edit-btn');
    newDeleteBtn.setAttribute("type", "submit");
    // newDeleteBtn.innerHTML = "Delete";
    newDeleteBtn.setAttribute('class','btn delete-btn');
    
    newDiv.appendChild(newP);
    newDiv.appendChild(newEditBtn);
    newDiv.appendChild(newDeleteBtn);
    fragment.appendChild(newDiv);
    tasksContainer.appendChild(fragment);    
}