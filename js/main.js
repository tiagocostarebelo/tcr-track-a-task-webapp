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
    const newP = document.createElement("p");
    const taskWrapper = document.querySelector('.tasks-ui');
    newP.classList.add('task-name');
    newP.innerHTML = newTask;
    taskWrapper.appendChild(newP);
}

function updateOpenTasks(tasks) {   
    count.innerHTML = tasks.length;     
}



