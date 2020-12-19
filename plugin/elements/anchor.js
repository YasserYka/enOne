"use strict";

const TextualConatiner = require("./containers/textualcontainer");
const CardClass = require('../style/cardclass');

module.exports = class Anchor extends TextualConatiner {

    constructor(url, text) {
        super();

        if (!this.safeType(url))
            throw new Error(`The URL can't be of type ${typeof url}`);

        this.url = url;
        this.text = text ? text : url;
    }

    toString(){

        return {[this.constructor.name]: {'url': this.url, 'text': this.text}};
    }

    toHtml() {

        return `
            <a target="_blank" href=${this.url} class="${CardClass[this.constructor.name]}">
                ${this.text}
            </a>
        `;
    }

}