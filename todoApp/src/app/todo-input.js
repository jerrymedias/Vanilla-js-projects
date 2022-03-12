export default class TodoInput {
    constructor(storeService, layoutService) {
        this.storeService = storeService;
        this.layoutService = layoutService;

        this.listenForNewTodoInput();
    }

    listenForNewTodoInput() {
        const todoInput = document.querySelector('#todo-input');

        todoInput.addEventListener('keyup', (e)=> {
            if(todoInput.value && e.code == 'Enter') {
                const todoObj = {
                    id: Math.round(Math.random() * 10000),
                    value: todoInput.value,
                    done: false
                }

                this.storeService.todos.unshift(todoObj);

                this.layoutService.addlayout(todoObj);

                todoInput.value = '';
            }
        });
    }
}