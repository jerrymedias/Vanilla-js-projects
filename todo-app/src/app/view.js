export default class View {

    constructor(storeService) {
        this.baseNode = document.querySelector('#todo');
        this.wrapperNode = document.querySelector('.todo-wrapper');

        this.storeService = storeService;
    }

    renderAllTodo(data) {
        data.forEach(element => {
            this.addElementToDom(element);
        });
    }

    addElementToDom(todo) {
        const node = this.baseNode.content.cloneNode(true);

        const divNode = node.querySelector('.todo');
        const inpChkWrapper = node.querySelector('.inp-chk-container');
        const input = node.querySelector('.entered-todo');
        const checkBox = node.querySelector('.checkbox');
        const deletebtn = node.querySelector('.delete');

        input.value = todo.title;
        checkBox.checked = todo.done;

        inpChkWrapper.id = `inpchk-${todo.id}`;
        deletebtn.id = `delete-${todo.id}`;
        checkBox.id = `checkbox-${todo.id}`;
        divNode.id = `todo-${todo.id}`;

        if(todo.done) {
            this.stripeThroughRemoveOrAdd(inpChkWrapper, input);
        }

        checkBox.addEventListener('change', (e) => {
            this.stripeThroughRemoveOrAdd(inpChkWrapper, input, checkBox.checked);
            todo.done = checkBox.checked;
            this.storeService.setTodoInLocal();
        });

        input.addEventListener('keyup', (e) => {
            const debounceInp = this.debounce(function(e) {
                todo.title = e.target.value;
                this.storeService.setTodoInLocal();
            }, 1000);

            debounceInp(e);
        });

        this.wrapperNode.insertBefore(node, this.wrapperNode.querySelector('.todo'));
    }

    stripeThroughRemoveOrAdd(inpChkWrapper, inputNode, add = true) {
        inpChkWrapper.style.opacity = add ? 0.5 : 1;
        add ? inputNode.classList.add('line-through') : inputNode.classList.remove('line-through');
    }

    debounce(fn, delay) {
        let timer;

        return(...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        }
    }
}