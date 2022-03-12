export default class Comment {
    
    constructor({title, level, parent, id}) {
        this.title = title;
        this.level = level;
        this.parent = parent;
        this.id = id;
        this.replies = [];
    }
}