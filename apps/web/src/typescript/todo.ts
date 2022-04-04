type TodoProps = {
  ID: string
  name: string
  checked: boolean
}

export class Todo {
  public form: HTMLFormElement = document.querySelector("form")!
  public todoInput: HTMLInputElement = document.querySelector("#todo")!

  public modal: HTMLDivElement = document.querySelector(".modal")!

  constructor() {
    /* try to load the todos, if they dont exist yet, do nothing */
    const allTodos = this.loadTodos()
    allTodos.map(({ name, ID, checked }) => {
      this.createTodo(name, ID, checked)
    })

    const checkboxes: NodeList = document.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach(checkbox => {
      const input = checkbox as HTMLInputElement
      input.addEventListener("change", event => {
        const Event = event as any

        this.changeTodo(Event.target.id)
      })
    })

    this.form.addEventListener("submit", (event) => {
      event.preventDefault()

      this.modal.style.display = "none";
      
      /* get the input from the user */
      const todo = this.todoInput.value

      /* create the todo on screen */
      const { todoID } = this.createTodo(todo)

      /* save it to localStorage */
      this.saveTodo(todo, todoID)

      /* listen to TODO change */
      this.todoInput.value = ""
    })
  }

  createTodo(todo: string, id?: string, checked?: boolean) {
    const ul = document.querySelector("ul")
    
    const li = this.createElement("li")

    /* give an id to input and label */
    const input = this.createElement("input")
    const label = this.createElement("label")

    /* get current time and use it as an ID */
    const todoID = id || new Date().getTime().toString()

    input.checked = checked || false
    input.setAttribute("type", "checkbox")
    input.id = todoID
    label.setAttribute("for", todoID)

    /* insert todo into the label */
    label.innerText = todo
    
    ul?.appendChild(li);

    li.appendChild(input);
    li.appendChild(label);

    return {
      todoID
    }
  }

  /* uses typescript to allow for tag autocompletion */
  createElement<K extends keyof HTMLElementTagNameMap>(elementName: K) {
    return document.createElement(elementName)
  }

  loadTodos(): TodoProps[] {
    if(!localStorage.getItem("todo")) {
      return []
    } else {
      return JSON.parse(localStorage.getItem("todo") || "")
    }
  }

  saveTodo(todo: string, todoID: string, checked?: boolean) {
    const allTodos = this.loadTodos()

    const todos: TodoProps[] = [
      ...allTodos,
      {
        ID: todoID,
        name: todo,
        checked: checked || false
      }
    ]

    localStorage.setItem("todo", JSON.stringify(todos))
  }

  changeTodo(todoID: string) {
    const todos = this.loadTodos()
    const todo = todos.find(todo => todo.ID === todoID)!

    const allTodosWithoutChangedTodo = todos.filter(todo => todo.ID !== todoID)

    const AllTodos: TodoProps[] = [
      ...allTodosWithoutChangedTodo,
      {
        ID: todoID,
        name: todo.name,
        checked: !todo.checked
      }
    ].sort((a, b) => {
      return parseFloat(a.ID) - parseFloat(b.ID);
    })

    localStorage.setItem("todo", JSON.stringify(AllTodos))
  }
}