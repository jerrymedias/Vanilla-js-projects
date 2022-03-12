export default class Store {

    constructor() {
        this.store = [];
    }

    getStore() {
        return this.store;
    }

    get getStoreCount() {
        return this.store.length;
    }

    setStore(data) {
        this.store.push(...data);
    }

    clearStore() {
        this.store = [];
    }

    transformData(data) {
        return data.map(el => {
            return {
                url: el.images.fixed_height.url,
                id: el.id,
                link: el.url,
                title: el.title
            }
        });
    }


}