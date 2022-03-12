export default class HttpClient {
    getUrl = 'https://jsonplaceholder.typicode.com/todos';

    constructor() {}

    async getAllTodos() {
        const response = await fetch(this.getUrl);
        const data = await response.json();

        return data.map(({id, title, completed}) => {
            return {
                id,
                value: title,
                done: completed
            }
        })
    }
}