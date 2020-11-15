"use strict";

module.exports = class Paragraph {

    constructor(text){
        this.text = text;
    }

    toHtml(){
        return `
            <p class="card-text">
                ${this.text}
            </p>
        `;
    }

}