class App extends Component {
    init() {
        //initalize stuff here
        this.text = "";
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.registerServiceWorker = this.registerServiceWorker.bind(this);
        this.registerServiceWorker();
    }


    registerServiceWorker() {
        //make sure service workers are supported
        if ('serviceWorker' in navigator) {
            //register the service worker, which acts as a proxy between the browser and the remove server
            //register it when the window loads with an event listener
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('js/sw_cached_pages.js')
                    .then(reg => console.log('Service worker registered'))
                    .catch(err => console.log(`Service worker error: ${err}`));
            })
        }
    }

    handleKeyDown(evt) {
        this.text = evt.target.value;
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
            <button>+</button>
            <footer>Built with <a href="https://github.com/amirgamil/poseidon">Poseidon</a> by <a href="https://amirbolous.com/">Amir</a></footer>
        </main>` 
    }
}

const app = new App();
document.body.appendChild(app.node);