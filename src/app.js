// Select DOM elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const pendingTasks = document.getElementById('pending-tasks');

let tasks = [];

function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b';
        row.innerHTML = `
            <td class="p-2">${task.text}</td>
            <td class="p-2">${task.date}</td>
            <td class="p-2"><button class="status-button" data-index="${index}">${task.completed ? 'Completed' : 'Pending'}</button></td>
            <td class="p-2"><button class="delete-button" data-index="${index}">Delete</button></td>
        `;
        todoList.appendChild(row);
    });

    // Update counters
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
    pendingTasks.textContent = tasks.filter(task => !task.completed).length;
}

function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === '') return;

    const task = {
        text: taskText,
        date: new Date().toLocaleDateString(),
        completed: false
    };
    tasks.push(task);
    todoInput.value = '';
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Event listeners
addButton.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        deleteTask(e.target.dataset.index);
    }
    if (e.target.classList.contains('status-button')) {
        toggleTaskStatus(e.target.dataset.index);
    }
});

renderTasks(); // Initial render
