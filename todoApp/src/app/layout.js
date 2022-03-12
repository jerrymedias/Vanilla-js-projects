export default class Layout {

    constructor(storeService) {
        this.baseNode = document.querySelector('#task');
        this.wrapper = document.querySelector('#tasks-wrapper');
        this.storeService = storeService;

        this.initLayout();
    }

    initLayout() {
        const data = this.storeService.getAllTodos();
        if(data.length) {
            data.forEach(element => this.addlayout(element));
        }
    }

    addlayout(eachTodo) {
        const node = this.baseNode.content.cloneNode(true);

        const taskContainer = node.querySelector('.task-container');
        const input = node.querySelector('.task-content');
        const deleteBtn = node.querySelector('.task-delete');
        const checkboxWrapper = node.querySelector('.task-check');
        const checkboxInput = checkboxWrapper.querySelector('input');
        const checkImg = checkboxWrapper.querySelector('img');

        checkboxInput.checked = eachTodo.done;

        if(eachTodo.done) {
            this.stripeThrough(input, checkImg);
        }

        input.value = eachTodo.value;

        taskContainer.id = `task-${eachTodo.id}`;


        deleteBtn.addEventListener('click', () => {
            this.storeService.deleteTodo(eachTodo.id);
            this.removeLayout(eachTodo.id);
        });

        checkboxInput.addEventListener('change', (e) => {
            if(checkboxInput.checked) {
                this.stripeThrough(input, checkImg);
            } else {
                this.removeStripeThrough(input, checkImg);
            }
        });

        input.addEventListener('keyup', () => {
            this.debounceEditInput(input, eachTodo);
        });

        this.wrapper.insertBefore(node, this.wrapper.querySelector('.task-container'));

    }

    debounceEditInput(inputRef, todoObj) {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            todoObj.value = inputRef.value;
            this.storeService.setStore(this.storeService.todos);
        }, 100);
    }

    stripeThrough(input, img) {
        input.classList.add('line-through', 'opacity-50');
        img.classList.remove('hidden');
    }

    removeStripeThrough(input, img) {
        input.classList.remove('line-through', 'opacity-50');
        img.classList.add('hidden');
    }

    removeLayout(id) {
        this.wrapper.removeChild(this.wrapper.querySelector(`#task-${id}`));
    }

}