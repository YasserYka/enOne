
export default class Input {

    constructor(placeholder) {
    
        this.placeholder = placeholder;
    }

    toHtml() {

        return `
            <textarea placeholder="${this.placeholder}" size="255" rows="8"></textarea>
        `;
    }

}