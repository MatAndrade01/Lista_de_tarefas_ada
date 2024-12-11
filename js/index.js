const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

let tasks = []; // {{title: 'Tarefa1', done: false}, ...}

function renderTaskOnHTML(taskTitle, done = false) {
    //Adicionando a nova tarefa no html
    const li = document.createElement('li');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('change', (event) => {
        const liToToggle = event.target.parentElement;

        const spanToToggle = liToToggle.querySelector("span");

        const done =event.target.checked;
        if (done) {
            spanToToggle.style.textDecoration = 'line-through';
        } else {
            spanToToggle.style.textDecoration = 'none';
        };
        tasks = tasks.map(tarefa => {
            if(tarefa.title === spanToToggle.textContent) {
                return {
                    title: tarefa.title,
                    done: !tarefa.done,
                };
            };
            return tarefa;
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    input.checked = done

    const span = document.createElement('span');
    span.textContent = taskTitle;
    if(done) {
        span.style.textDecoration = 'line-through';
    }

    const button = document.createElement('button');
    button.textContent = "Remover";
    button.addEventListener('click', (event) => {
        const liToRemove = event.target.parentElement;
        
        const titleToRemove = liToRemove.querySelector("span").textContent; // Tarefa 1

        tasks = tasks.filter(tarefa => tarefa.title !== titleToRemove);

        todoListUl.removeChild(liToRemove);
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    })

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);

    todoListUl.appendChild(li);
};

window.onload = () => {
    const tasksOnLocalStorage = localStorage.getItem('tasks');
    if (!tasksOnLocalStorage) {
        return;
    }

    tasks = JSON.parse(tasksOnLocalStorage);
    
    tasks.forEach(task => {
        renderTaskOnHTML(task.title, task.done);
    });
};

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o comportamento padrao de recarregar a pagina ao submeter o formulario

    const taskTitle = taskTitleInput.value
    

    if (taskTitle.length < 3) {
        alert("Sua tarefa precisa ter pelo menos 3 caractes.");
        return;
    };


    // Adicionando a nova tarefa no array tasks[]
    tasks.push({
        title: taskTitle,
        done: false
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //Adicionando a nova tarefa no html
    renderTaskOnHTML(taskTitle);

    taskTitleInput.value = '';
});