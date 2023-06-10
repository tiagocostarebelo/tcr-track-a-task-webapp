//VARIABLES
let newTask;
let tasks = [];
// SELECTORS
const nameInput = document.querySelector('#name');
const taskInput = document.querySelector('#new-task');
const addTaskBtn = document.querySelector('.add-task-btn');
const count = document.querySelector('.counter');   

//EVENT LISTENERS
window.addEventListener('load', checkLocalStorage);
nameInput.addEventListener('input', adjustInputWidth);
addTaskBtn.addEventListener('click', addNewTask);


// FUNCTIONS
function checkLocalStorage () {
    username = localStorage.getItem('username') || '';
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];    
}

function adjustInputWidth() {
    const name = nameInput.value;    
    const width = name.length * 9;
    nameInput.style.width = width + "px";
}

function addNewTask(event) {
    event.preventDefault();
    newTask = taskInput.value;
    tasks.push(newTask); 
    updateUi(newTask);
    updateOpenTasks(tasks);
}

function updateUi(newTask) {
    const newDiv = document.createElement("div");
    const newP = document.createElement("p");
    const newBtn = document.createElement("button");
    const taskWrapper = document.querySelector('.tasks-ui');
    
    newDiv.classList.add('task-container');
    newP.classList.add('task-name');
    newP.innerHTML = newTask;   
    newBtn.setAttribute("type", "submit");
    newBtn.innerHTML = "Delete";
    newBtn.classList.add('btn');
    newBtn.classList.add('delete-btn');
    
    newDiv.appendChild(newP);
    newDiv.appendChild(newBtn);
    taskWrapper.appendChild(newDiv);
}

function updateOpenTasks(tasks) {   
    count.innerHTML = tasks.length;     
}



