class App extends Component {
    init() {
        //initalize stuff here
        if (!window.localStorage.getItem("text")) {
            window.localStorage.setItem("text", "");
            this.text = "";
        } else {
            this.text = window.localStorage.getItem("text");
        }
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.registerServiceWorker = this.registerServiceWorker.bind(this);
        this.addNewPage = this.addNewPage.bind(this);
        this.registerServiceWorker();
    }


    registerServiceWorker() {
        //make sure service workers are supported
        if ('serviceWorker' in navigator) {
            //register the service worker, which acts as a proxy between the browser and the remove server
            //register it when the window loads with an event listener
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw_cached_pages.js')
                    .then(reg => console.log('Service worker registered'))
                    .catch(err => console.log(`Service worker error: ${err}`));
            })
        }
    }

    addNewPage() {
        //do animation stuff
        this.text = "";
        window.localStorage.setItem("text", "");
        this.render();
    }

    handleKeyDown(evt) {
        this.text = evt.target.value;
        window.localStorage.setItem("text", this.text);
        this.render();
    }

    create() {
        const hour = new Date().getHours();
		if (hour > 19 || hour < 7) {
			document.body.classList.add('dark');
			document.documentElement.style.color = '#222';
		} else {
			document.body.classList.remove('dark');
			document.documentElement.style.color = '#fafafa';
		}
        return html`<main>
            <div class="content">
                <div class="textbox"> 
                    <textarea oninput=${this.handleKeyDown} class="littlePadding" placeholder="Dump it :)" value=${this.text}></textarea>
                    <pre class="p-heights littlePadding ${this.text.endsWith("\n") ? 'endline' : ''}">${this.text}</pre> 
                </div>
            </div>
            <button class="icon" onclick=${this.addNewPage}>+</button>
            <footer>Built with <a href="https://github.com/amirgamil/poseidon">Poseidon</a> by <a href="https://amirbolous.com/">Amir</a></footer>
        </main>` 
    }
}

const app = new App();
document.body.appendChild(app.node);