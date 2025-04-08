const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

window.addEventListener('DOMContentLoaded', loadTasks);
addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  saveTasks();
  taskInput.value = '';
}

function createTaskElement(text) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.textContent = text;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  return li;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(task => {
    tasks.push({
      text: task.firstChild.textContent,
      completed: task.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const taskItem = createTaskElement(task.text);
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    taskList.appendChild(taskItem);
  });
}
