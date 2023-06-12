//VARIABLES
let username;
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
nameInput.addEventListener('input', setUsername);
nameInput.addEventListener('input', adjustInputWidth);
addTaskBtn.addEventListener('click', addNewTask);
window.addEventListener('click', deleteTask);
window.addEventListener('click', editTask);



// FUNCTIONS
function setUsername() {
    if(nameInput.value == '') {
        nameInput.style.backgroundColor = "lightblue";
    } else {
        nameInput.style.backgroundColor = "transparent";
        username = nameInput.value;
        window.localStorage.setItem('username', `${username}`);
        checkLocalStorage(username);
    }
}

function checkLocalStorage(username, tasks) {
    username = localStorage.getItem('username');
    // tasks = JSON.parse(localStorage.getItem('tasks')) || []; 
    
    if(username !== '') {
        nameInput.value = username;
        adjustInputWidth(username);
    }
}

function adjustInputWidth(username) {
    const name = username;    
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

function updateUi(newTask) {
    const fragment = document.createDocumentFragment();
    const newDiv = document.createElement("div");
    const newP = document.createElement("input");
    const newEditBtn = document.createElement("button");
    const newDeleteBtn = document.createElement("button");
    
    
    newDiv.setAttribute('class', 'task-container');
    newP.setAttribute('class', 'task-name');
    newP.setAttribute("readonly", true);
    newP.setAttribute("value", `${newTask}`);   
    newEditBtn.setAttribute("type", "submit");
    newEditBtn.innerText = "Edit";
    newEditBtn.setAttribute('class', 'btn');
    newEditBtn.setAttribute('class', 'edit-btn');
    newDeleteBtn.setAttribute("type", "submit");
    newDeleteBtn.innerHTML = "Delete";
    newDeleteBtn.setAttribute('class', 'btn');
    newDeleteBtn.setAttribute('class', 'delete-btn');
    
    newDiv.appendChild(newP);
    newDiv.appendChild(newEditBtn);
    newDiv.appendChild(newDeleteBtn);
    fragment.appendChild(newDiv);
    tasksContainer.appendChild(fragment);
}

function updateOpenTasks(tasks) {   
    count.innerHTML = tasks.length;     
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

function editTask(e) {
    const clickedBtn = e.target;
    if(clickedBtn.classList.contains('edit-btn')) {
        const inputField = clickedBtn.parentElement.firstChild;
        const oldTaskName = inputField.value;
        inputField.removeAttribute("readonly");
        inputField.style.backgroundColor = "lightblue";
        inputField.focus();
        
        inputField.addEventListener('blur', (e) => {
            const newTaskName = inputField.value;
            inputField.style.backgroundColor = "transparent";
            inputField.setAttribute('readonly', true);
            if(tasks.includes(oldTaskName)) {
                const indexOfTasks = tasks.indexOf(oldTaskName);
                tasks[indexOfTasks] = newTaskName;
            }
        })
    }
    else {
        return;
    }
}






