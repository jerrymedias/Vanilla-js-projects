import HttpClient from './app/http-client';
import Layout from './app/layout';
import Store from './app/store';
import TodoInput from './app/todo-input';
import './style.scss';

export const loadApp = async () => {
    const httpService = new HttpClient();
    const storeService = new Store();

    if (window.localStorage.todoData) {
        storeService.getLocalStore();
    } else {
        const data = await httpService.getAllTodos();
        storeService.setStore(data);
    }

    const layoutService = new Layout(storeService);
    new TodoInput(storeService, layoutService);
};


loadApp();
