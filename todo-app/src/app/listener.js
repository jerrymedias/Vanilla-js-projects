export default class Listener {

    constructor(storeService, viewService) {
        this.storeService = storeService;
        this.viewService = viewService;
    }
    
    initListener() {
        const wrapperNode = document.querySelector('.todo-wrapper');
        let inputNode = document.querySelector('#todo-input');

        inputNode.addEventListener('keyup', (e) => {
            if(inputNode.value && e.code == 'Enter') {
                const data = {
                    id: parseInt(Math.random() * 100000, 10),
                    title: inputNode.value,
                    done: false
                }
    
                this.storeService.addAndSetTodo(data);
                this.viewService.addElementToDom(data);

                inputNode.value = '';
            }
        });

        wrapperNode.addEventListener('click', (e) => {
            if(e.target.classList[0] == 'delete') {
                const id = e.target.id.replace('delete-', '');
                const node = wrapperNode.querySelector(`#todo-${id}`);
                wrapperNode.removeChild(node);
                this.storeService.removeFromStore(id);
            }
        })
    }
}