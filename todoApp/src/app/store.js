export default class Store {

    constructor() {
        this.todos = [];
    }

    setStore(data) {
        localStorage.setItem('todoData', JSON.stringify(data))
    }

    getLocalStore() {
        this.todos = JSON.parse(window.localStorage.todoData);
    }

    getAllTodos() {
        return this.todos;
    }

    deleteTodo(id) {
        for(let i = 0; i< this.todos.length; i++) {
            if(this.todos[i].id == id) {
                this.todos.splice(i, 1);
                break;
            }
        }
    }
}