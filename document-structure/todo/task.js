const tasksForm = document.getElementById('tasks__form');
const tasksInput = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');

function addTask(title) {
    if (title.trim() === '') return;

    const taskHtml = `
        <div class="task">
            <div class="task__title">${title}</div>
            <a href="#" class="task__remove">&times;</a>
        </div>
    `;
    
    tasksList.insertAdjacentHTML('beforeend', taskHtml);

    const lastTask = tasksList.lastElementChild;
    const removeBtn = lastTask.querySelector('.task__remove');

    removeBtn.onclick = (e) => {
        e.preventDefault();
        lastTask.remove();
        saveTasks();
    };

    saveTasks();
}

tasksForm.onsubmit = (e) => {
    e.preventDefault();
    addTask(tasksInput.value);
    tasksInput.value = '';
};

function saveTasks() {
    const titles = Array.from(document.querySelectorAll('.task__title')).map(div => div.innerText);
    localStorage.setItem('myTasks', JSON.stringify(titles));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('myTasks') || '[]');
    saved.forEach(title => addTask(title));
}

loadTasks();