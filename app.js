const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load Event Listeners
loadEventListeners();


// Load Event Listeners Function
function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add a task event
    form.addEventListener('submit', addTask);
    // Remove a task event 
    taskList.addEventListener('click', removeTask);
    // Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
};


// GET Tasks from LS function
function getTasks(){
    let tasks;
    if(!localStorage.getItem('tasks')){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);
    });

};



// Add a atask function
function addTask(e){
    if(!taskInput.value){
        alert('Enter a task first');
        e.preventDefault();
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);

        // Store tasks in LS event
        storeTasksInLocalStorage(taskInput.value);

        taskInput.value = '';
    };

    e.preventDefault();
};


// Store tasks in local storage function
function storeTasksInLocalStorage(task){
    let tasks;
    if(!localStorage.getItem('tasks')){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));


};


// Remove a task function
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to remove this task?')){
            e.target.parentElement.parentElement.remove();
            

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        };
    };

    e.preventDefault();
};


// Remove From LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(!localStorage.getItem('tasks')){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        };
    });


    localStorage.setItem('tasks', JSON.stringify(tasks));
};


// Clear tasks function
function clearTasks(e){
    if(confirm('Are you sure you want to clear all tasks?')){    
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        };
    };

    // Clear from LS
    clearTasksFromLocalStorage();


    e.preventDefault();
};

// Clear tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
};


// Filter tasks function
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.innerText.toLowerCase();
        if(item.indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}