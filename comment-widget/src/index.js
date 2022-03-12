import './style.scss';
import Store from "./app/store";
import View from "./app/view";

export const loadApp = () => {
    const store = new Store();
    const view = new View(store);

    // view.initLayout();
}

loadApp();