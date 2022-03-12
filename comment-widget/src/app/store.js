import Comment from "./comment";

export default class Store {

    constructor() {
        this.store = this.getStore();
    }

    addComment(title, parent, level, id) {
        if(level == 1) {
            this.store.push(new Comment({title, level, parent, id}))
        } else {
            this.findParentAndPushReply({title, level, parent, id}, this.store);
        }

        this.setStore();
    }

    findParentAndPushReply(commentObj, commentArr) {
        for(let i = 0; i < commentArr.length; i++) {
            if(commentArr[i].id == commentObj.parent) {
                commentArr[i].replies.push(new Comment(commentObj));
                return;
            } else if(commentArr[i].replies.length) {
                this.findParentAndPushReply(commentObj, commentArr[i].replies);
                break;
            } else {
                return;
            }
        }
    }

    setStore() {
        localStorage.setItem('comment', JSON.stringify(this.store));
    }

    deleteComment(id, arr = this.store) {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].id == id) {
                arr.splice(i, 1);
                return;
            } else if (arr[i].replies.length) {
                this.deleteComment(id, arr[i].replies);
                break;
            }
        }
    }

    getStore() {
        return JSON.parse(localStorage.getItem('comment')) ?? [];
    }

    get allComment() {
        return this.store;
    }
}