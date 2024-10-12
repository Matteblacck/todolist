const form = document.querySelector('#form');
const input = document.querySelector('#taskInput');
const taskList = document.querySelector('.list')

let tasks = [];

if (localStorage.getItem('tasks')){

    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function(task){
    //формируем css класс
    const cssClass = task.done ? "task task--done" : "task";
    
    const taskHTML = `<li id="${task.id}" class="list-item">
                        <span  class="${cssClass}">${task.text}</span>
                        <div class="buttons task--done">
                            <button data-action="done" class="submitBtn" type="button"> <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                <svg width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#77B255" d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"></path><path fill="#FFF" d="M29.28 6.362a2.502 2.502 0 0 0-3.458.736L14.936 23.877l-5.029-4.65a2.5 2.5 0 1 0-3.394 3.671l7.209 6.666c.48.445 1.09.665 1.696.665c.673 0 1.534-.282 2.099-1.139c.332-.506 12.5-19.27 12.5-19.27a2.5 2.5 0 0 0-.737-3.458z"></path></svg>
                                <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            </button>
                            <button data-action="delete" class="crossBtn" type="button">
                                <svg width="20px" height="20px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet"><path d="M62 52c0 5.5-4.5 10-10 10H12C6.5 62 2 57.5 2 52V12C2 6.5 6.5 2 12 2h40c5.5 0 10 4.5 10 10v40z" fill="#ff5a79"></path><path fill="#ffffff" d="M50 21.2L42.8 14L32 24.8L21.2 14L14 21.2L24.8 32L14 42.8l7.2 7.2L32 39.2L42.8 50l7.2-7.2L39.2 32z"></path></svg>
                            </button>
                        </div>
                    </li>`
    // добавляем задачу в список
    taskList.insertAdjacentHTML('beforeend', taskHTML);

})



function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
    

}



//добавление задачи
form.addEventListener('submit', addTask);

function addTask(event) {
        // убираем обновление стр
        event.preventDefault();

        // достаем текст
        const taskText = input.value;

        //описываем задачу в виде обьекта
        const newTask = {
            id: Date.now(),
            text: taskText,
            done: false
        }
        //добавляем обьект в массив с задачами
        tasks.push(newTask);

        console.log(tasks)

        //формируем css класс
        const cssClass = newTask.done ? "task task--done" : "task";
    
        const taskHTML = `<li id="${newTask.id}" class="list-item">
                            <span  class="${cssClass}">${newTask.text}</span>
                            <div class="buttons task--done">
                                <button data-action="done" class="submitBtn" type="button"> <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                    <svg width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#77B255" d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"></path><path fill="#FFF" d="M29.28 6.362a2.502 2.502 0 0 0-3.458.736L14.936 23.877l-5.029-4.65a2.5 2.5 0 1 0-3.394 3.671l7.209 6.666c.48.445 1.09.665 1.696.665c.673 0 1.534-.282 2.099-1.139c.332-.506 12.5-19.27 12.5-19.27a2.5 2.5 0 0 0-.737-3.458z"></path></svg>
                                    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                </button>
                                <button data-action="delete" class="crossBtn" type="button">
                                    <svg width="20px" height="20px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet"><path d="M62 52c0 5.5-4.5 10-10 10H12C6.5 62 2 57.5 2 52V12C2 6.5 6.5 2 12 2h40c5.5 0 10 4.5 10 10v40z" fill="#ff5a79"></path><path fill="#ffffff" d="M50 21.2L42.8 14L32 24.8L21.2 14L14 21.2L24.8 32L14 42.8l7.2 7.2L32 39.2L42.8 50l7.2-7.2L39.2 32z"></path></svg>
                                </button>
                            </div>
                        </li>`
        // добавляем задачу в список
        taskList.insertAdjacentHTML('beforeend', taskHTML);
    
        //
        input.value = '';
        input.focus();

        //сохранение 
        saveToLocalStorage();

}

//удаление задачи
taskList.addEventListener('click', deleteTask);

function deleteTask(event){
    if (event.target.dataset.action === "delete"){
        const parentNode = event.target.closest('.list-item');

        //определение id задачи
        const id = parentNode.id

        //находим индекс задачи в массиве
        const index = tasks.findIndex(function (task){
            if (task.id == id){
                return true
            }
        })

        //сохранение 
        saveToLocalStorage();

        //удаление задачи из массива
        tasks.splice(index,1)

        parentNode.remove();

        
    }

}

//отмечаем задачу завершенной
taskList.addEventListener('click', doneTask);

function doneTask(event){
    if (event.target.dataset.action === "done"){

        const parentNode = event.target.closest(".list-item");

        //определяем id задачи
        const id = Number(parentNode.id);

        const task = tasks.find(function(task){
            if (task.id === id){
                return true;
            }
        })
        console.log(task)

        task.done = !task.done

        const taskTitle =  parentNode.querySelector(".task");
        taskTitle.classList.toggle('task--done');

        //сохранение 
        saveToLocalStorage();

    }

}

