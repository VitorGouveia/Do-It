export class Todo {
    constructor() {
        this.form = document.querySelector("form");
        this.todoInput = document.querySelector("#todo");
        this.modal = document.querySelector(".modal");
        const allTodos = this.loadTodos();
        allTodos.map(({ name, ID, checked }) => {
            this.createTodo(name, ID, checked);
        });
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const input = checkbox;
            input.addEventListener("change", event => {
                const Event = event;
                this.changeTodo(Event.target.id);
            });
        });
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.modal.style.display = "none";
            const todo = this.todoInput.value;
            const { todoID } = this.createTodo(todo);
            this.saveTodo(todo, todoID);
            this.todoInput.value = "";
        });
    }
    createTodo(todo, id, checked) {
        const ul = document.querySelector("ul");
        const li = this.createElement("li");
        const input = this.createElement("input");
        const label = this.createElement("label");
        const todoID = id || new Date().getTime().toString();
        input.checked = checked || false;
        input.setAttribute("type", "checkbox");
        input.id = todoID;
        label.setAttribute("for", todoID);
        label.innerText = todo;
        ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
        li.appendChild(input);
        li.appendChild(label);
        return {
            todoID
        };
    }
    createElement(elementName) {
        return document.createElement(elementName);
    }
    loadTodos() {
        if (!localStorage.getItem("todo")) {
            return [];
        }
        else {
            return JSON.parse(localStorage.getItem("todo") || "");
        }
    }
    saveTodo(todo, todoID, checked) {
        const allTodos = this.loadTodos();
        const todos = [
            ...allTodos,
            {
                ID: todoID,
                name: todo,
                checked: checked || false
            }
        ];
        localStorage.setItem("todo", JSON.stringify(todos));
    }
    changeTodo(todoID) {
        const todos = this.loadTodos();
        const todo = todos.find(todo => todo.ID === todoID);
        const allTodosWithoutChangedTodo = todos.filter(todo => todo.ID !== todoID);
        const AllTodos = [
            ...allTodosWithoutChangedTodo,
            {
                ID: todoID,
                name: todo.name,
                checked: !todo.checked
            }
        ].sort((a, b) => {
            return parseFloat(a.ID) - parseFloat(b.ID);
        });
        localStorage.setItem("todo", JSON.stringify(AllTodos));
    }
}
