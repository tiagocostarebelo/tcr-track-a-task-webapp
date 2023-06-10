//VARIABLES
let newTask;
let tasks = [];
// SELECTORS
const nameInput = document.querySelector('#name');
const taskInput = document.querySelector('#new-task');
const addTaskBtn = document.querySelector('.add-task-btn');
const count = document.querySelector('.counter');  
const tasksContainer = document.querySelector('.tasks-ui'); 


//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', checkLocalStorage);
nameInput.addEventListener('input', adjustInputWidth);
addTaskBtn.addEventListener('click', addNewTask);
window.addEventListener('click', deleteTask);
window.addEventListener('click', editTask);


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
    taskInput.value = '';
}

function updateUi(param) {
    const fragment = document.createDocumentFragment();
    const newDiv = document.createElement("div");
    const newP = document.createElement("input");
    const newEditBtn = document.createElement("button");
    const newDeleteBtn = document.createElement("button");
    
    
    newDiv.setAttribute('class', 'task-container');
    newP.setAttribute('class', 'task-name');
    newP.setAttribute("readonly", true);
    newP.setAttribute("value", `${param}`);   
    newEditBtn.setAttribute("type", "submit");
    newEditBtn.innerText = "Edit";
    newEditBtn.setAttribute('class', 'btn');
    newEditBtn.setAttribute('class', 'edit-btn');
    newDeleteBtn.setAttribute("type", "submit");
    newDeleteBtn.innerText = "Delete";
    newDeleteBtn.setAttribute('class', 'btn');
    newDeleteBtn.setAttribute('class', 'delete-btn');
    
    newDiv.appendChild(newP);
    newDiv.appendChild(newEditBtn);
    newDiv.appendChild(newDeleteBtn);
    fragment.appendChild(newDiv);
    tasksContainer.appendChild(fragment);
}

function updateOpenTasks(param) {   
    count.innerHTML = param.length;     
}

function deleteTask(e) {
    const clickedBtn = e.target;
    if(clickedBtn.classList.contains('delete-btn')) {
        const taskName = clickedBtn.parentElement.firstChild.value;
        if (tasks.includes(taskName)) {
            const indexOfTasks = tasks.indexOf(taskName);
            tasks.splice(indexOfTasks, 1);
        }
        clickedBtn.parentElement.remove();
        updateOpenTasks(tasks);
    }
    else {
        return;
    }
}






