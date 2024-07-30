document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoDatetime = document.getElementById('todo-datetime');
    const todoDescription = document.getElementById('todo-description');
    const charCount = document.getElementById('char-count');
    const maxCharMessage = document.getElementById('max-char-message');
    const todoList = document.getElementById('todo-list');
    let tasks = [];
    let nextTaskId = 1;

    // Set min attribute for datetime-local input
    function setMinDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        todoDatetime.setAttribute('min', currentDateTime);
    }

    setMinDateTime();

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = todoInput.value.trim();
        const taskDateTime = todoDatetime.value;
        const taskDescription = todoDescription.value.trim();
        if (newTask && taskDateTime) {
            addTask(newTask, taskDateTime, taskDescription);
            todoInput.value = '';
            todoDatetime.value = '';
            todoDescription.value = '';
            charCount.textContent = '0/200 characters';
            charCount.classList.remove('red');
            maxCharMessage.style.display = 'none';
        }
    });

    todoDescription.addEventListener('input', () => {
        const chars = todoDescription.value.length;
        charCount.textContent = `${chars}/200 characters`;
        if (chars >= 200) {
            charCount.classList.add('red');
            maxCharMessage.style.display = 'block';
        } else {
            charCount.classList.remove('red');
            maxCharMessage.style.display = 'none';
        }
    });

    function addTask(task, dateTime, description) {
        const taskId = nextTaskId++;
        tasks.push({ id: taskId, task, dateTime, description });
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    function editTask(taskId, oldTask, oldDateTime, oldDescription) {
        const task = prompt('Edit Task', oldTask);
        const dateTime = prompt('Edit Date & Time', oldDateTime);
        const description = prompt('Edit Description', oldDescription);
        if (task && dateTime) {
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex > -1) {
                tasks[taskIndex] = { id: taskId, task, dateTime, description };
                renderTasks();
            }
        }
    }

    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-id', task.id);
            li.innerHTML = `<strong>Task ${index + 1}:</strong> ${task.task}<br>
                                    <strong>Date & Time:</strong> ${task.dateTime}<br>
                                    <strong>Description:</strong> ${task.description || 'N/A'}`;

            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            editBtn.addEventListener('click', () => editTask(task.id, task.task, task.dateTime, task.description));

            taskActions.appendChild(editBtn);
            taskActions.appendChild(deleteBtn);
            li.appendChild(taskActions);

            todoList.appendChild(li);
        });
    }
});