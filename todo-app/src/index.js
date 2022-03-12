import HttpClient from './app/http-client';
import Listener from './app/listener';
import Store from './app/store';
import View from './app/view';
import './style.scss';

export const loadApp = async() => {
    const httpClient = new HttpClient();
    const storeService = new Store();

    let data = [];

    if(!storeService.getAllTodos().length) {
        try {
            data = await httpClient.getAllTodos();
            storeService.setTodos(data);
        } catch(err) {
            alert(err);
        }
    } else {
        data = storeService.getAllTodos();

    }

    const viewService = new View(storeService);

    viewService.renderAllTodo(data);

    const listener = new Listener(storeService, viewService);
    listener.initListener();
}

loadApp();