import Container from "./container.js";

export default class IFrame extends Container {

    constructor(url) {
        
        super();
        this.url = url;
    }

    toHtml() {

        return `
            <div class="embed-responsive embed-responsive-4by3">
                <iframe class="embed-responsive-item" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="${this.url}"></iframe>
            </div>
        `;
    }

}