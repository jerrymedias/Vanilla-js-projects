export default class View {

    constructor(storeService) {
        this.inputBaseNode = document.querySelector('#input');
        this.commentWrapperNode = document.querySelector('#comment-wrapper');
        this.replyNode = document.querySelector('#comment');
        this.storeService = storeService;
        this.initLayout();
    }

    initLayout() {
        const node = this.inputBaseNode.content.cloneNode(true);

        const textArea = node.querySelector('.comment-input');

        textArea.addEventListener('keyup', (e) => {
            if(textArea.value && e.code == 'Enter') {
                this.addLevelComment(this.commentWrapperNode, textArea.value, 1,
                    parseInt(Math.random() * 100000, 10), true);
                textArea.value = "";
            }
        });

        this.commentWrapperNode.appendChild(node);
        textArea.focus();

        this.appendComment(this.storeService.store);
    }

    appendComment(store) {
        store.forEach(commentObj => {
            const parentNode = commentObj.level == 1
            ? this.commentWrapperNode
            : document.querySelector(`#comment-${commentObj.parent}`)
            .querySelector('.nesting');

            this.addLevelComment(parentNode, commentObj.title, commentObj.level, commentObj.parent, false, commentObj.id);

            if (commentObj.replies.length) {
                this.appendComment(commentObj.replies);
            }
        });

        return;
    }

    addLevelComment(parentNode, value, level, parentId, add, id = parseInt(Math.random() * 100000, 10)) {
        const node = this.replyNode.content.cloneNode(true);

        const content = node.querySelector('.content');
        const comment = node.querySelector('.comment');
        const deleteComment = node.querySelector('.delete');
        const reply = node.querySelector('.reply');
        const nesting = node.querySelector('.nesting');
        const nestedInput = node.querySelector('.comment-box');

        comment.id = `comment-${id}`;

        content.textContent = value;
        content.style.backgroundColor = 'red';

        add && this.storeService.addComment(value, parentId, level, id);

        parentNode.appendChild(node);

        reply.addEventListener('click', () => {
            const node = this.inputBaseNode.content.cloneNode(true);
            const textArea = node.querySelector('.comment-input');
            nestedInput.appendChild(textArea);
            textArea.focus();

            textArea.addEventListener('keyup', (e)=> {
                if(textArea.value && e.code == 'Enter') {
                    this.addLevelComment(nesting, textArea.value, level+1, id, true);
                    nestedInput.removeChild(textArea);
                }
            });
        });

        deleteComment.addEventListener('click', () => {
            const nestedNode = document.querySelector(`#comment-${id}`);
            parentNode.removeChild(nestedNode);
            this.storeService.deleteComment(id);
            this.storeService.setStore();
        });

    }
}