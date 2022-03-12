export default class Store {
    constructor() {
        this.store = [];
    }

    addAndSetTodo(data) {
        this.store.push(data);
        this.setTodoInLocal();
    }

    setTodoInLocal() {
        localStorage.setItem('todo', JSON.stringify(this.store));
    }

    get todo() {
        return this.store;
    }

    getAllTodos() {
        this.store = JSON.parse(localStorage.getItem('todo'))??[];
        return this.store;
    }

    setTodos(data) {
        this.store = data;
        this.setTodoInLocal();
    }

    removeFromStore(id) {
        for(let i = 0; i < this.store.length; i++) {
            if(this.store[i].id == id) {
                this.store.splice(i, 1);
                break;
            }
        }

        this.setTodoInLocal();
    }
}