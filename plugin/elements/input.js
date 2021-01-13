
export default class Input {

    constructor(placeholder) {
    
        this.placeholder = placeholder;
    }

    toHtml() {

        return `
            <textarea placeholder="${this.placeholder}" rows="8"></textarea>
        `;
    }

}