// Получаем элементы из DOM
const form = document.querySelector('#form');
const input = document.querySelector('#taskInput');
const taskList = document.querySelector('.list');

let tasks = [];

// Загружаем задачи из localStorage, если они есть
if (localStorage.getItem('tasks')) {
    try {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        if (!Array.isArray(tasks)) {
            tasks = []; // Если это не массив, перезаписываем пустым массивом
        }
    } catch (e) {
        tasks = []; // В случае ошибки парсинга также перезаписываем пустым массивом
    }
}

// Функция для отображения всех задач
tasks.forEach(renderTask);

// Функция для сохранения задач в localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для рендеринга одной задачи
function renderTask(task) {
    const cssClass = task.done ? "task task--done" : "task";
    
    const taskHTML = `<li id="${task.id}" class="list-item">
                        <span class="${cssClass}">${task.text}</span>
                        <div class="buttons">
                            <button data-action="done" class="submitBtn" type="button">
                                <svg width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#77B255" d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"></path><path fill="#FFF" d="M29.28 6.362a2.502 2.502 0 0 0-3.458.736L14.936 23.877l-5.029-4.65a2.5 2.5 0 1 0-3.394 3.671l7.209 6.666c.48.445 1.09.665 1.696.665c.673 0 1.534-.282 2.099-1.139c.332-.506 12.5-19.27 12.5-19.27a2.5 2.5 0 0 0-.737-3.458z"></path></svg>
                            </button>
                            <button data-action="delete" class="crossBtn" type="button">
                                <svg width="20px" height="20px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M62 52c0 5.5-4.5 10-10 10H12C6.5 62 2 57.5 2 52V12C2 6.5 6.5 2 12 2h40c5.5 0 10 4.5 10 10v40z" fill="#ff5a79"></path><path fill="#ffffff" d="M50 21.2L42.8 14L32 24.8L21.2 14L14 21.2L24.8 32L14 42.8l7.2 7.2L32 39.2L42.8 50l7.2-7.2L39.2 32z"></path></svg>
                            </button>
                        </div>
                    </li>`;
    taskList.insertAdjacentHTML('beforeend', taskHTML);
}

// Обработчик для добавления новой задачи
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskText = input.value.trim();
    if (taskText === '') return; // Проверка на пустое значение

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(newTask);
    renderTask(newTask);
    saveToLocalStorage();

    input.value = '';
    input.focus();
});

// Обработчик для удаления и завершения задачи
taskList.addEventListener('click', function(event) {
    if (event.target.closest('button')) {
        const action = event.target.closest('button').dataset.action;
        const parentNode = event.target.closest('.list-item');
        const id = Number(parentNode.id);

        if (action === 'delete') {
            tasks = tasks.filter(task => task.id !== id);
            parentNode.remove();
            saveToLocalStorage();
        } else if (action === 'done') {
            const task = tasks.find(task => task.id === id);
            if (task) {
                task.done = !task.done;
                const taskTitle = parentNode.querySelector(".task");
                taskTitle.classList.toggle('task--done');
                saveToLocalStorage();
            }
        }
    }
});