"use strict";

const Conatiner = require("./containers/container");
const CardClass = require('../style/styleclass');

module.exports = class Anchor extends Conatiner {

    constructor(url, text) {
        super();

        if (!this.safeType(url))
            throw new Error(`The URL can't be of type ${url.constructor.name}`);

        if (!this.safeType(text))
            throw new Error(`The URL can't be of type ${text.constructor.name}`);

        this.url = url;
        this.text = text;
    }

    toHtml() {

        return `
            <a target="_blank" href=${this.url} class="${CardClass[this.constructor.name]}">
                ${this.text}
            </a>
        `;
    }

}