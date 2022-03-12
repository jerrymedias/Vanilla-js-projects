import HttpClient from './app/http-client';
import View from './app/view';
import Store from './app/store';
import './style.scss';

export const loadApp = () => {

    const httpService = new HttpClient();
    const storeService = new Store();
    const viewService = new View();

    let searchTerm = '';

    const fetchDataAndPlot = async(offset = 0) => {
        if(!storeService.getStoreCount) {
            let data = await httpService.getGifs(searchTerm, offset);
            data = storeService.transformData(data);
            storeService.setStore(data);
            
            viewService.addGifsToDom(data);
        }
    }

    viewService.initInputListener(async (e) => {
        if(searchTerm) { 
            viewService.clearWrapper();
            storeService.clearStore();
        }

        searchTerm = e.target.value?.trim();

        if(searchTerm) {
           await fetchDataAndPlot();
        }
    })

};

loadApp();
