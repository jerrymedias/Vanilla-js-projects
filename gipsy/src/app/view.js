export default class View {
    constructor() {
        this.baseNode = document.querySelector('#gifs');
        this.wrapperNode = document.querySelector('#gifs-wrapper');
        this.inputNode = document.getElementById('gifs-input');
    }

    addGifsToDom(data) {
        data.forEach(ele => {
            const gifNode = this.createEachGifNode(ele);
            this.wrapperNode.appendChild(gifNode);
        });
    }

    createEachGifNode(data) {
        const node = this.baseNode.content.cloneNode(true);

        const img = node.querySelector('.image');

        img.src = data.url;
        img.alt = data.title;
        img.parentNode.id = data.id;

        return node;
    }

    initInputListener(callback) {
        const debouncSearchInput = this.debounce(callback, 1000);

        this.inputNode.addEventListener('keyup', (e) => {
            debouncSearchInput(e)
        });
    }

    debounce(fn, delay) {
        let timer;

        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        }
    }

    clearWrapper() {
        this.wrapperNode.innerHTML = '';
    }

    clearInput(e) {
        e.value = '';
    }
}