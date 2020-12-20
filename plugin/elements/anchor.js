"use strict";

const Container = require("./container");
const CardClass = require('../style/styleclass');

module.exports = class Anchor extends Container {

    constructor(url, text) {
        super();
        this.setTypes(['String', 'Bold']);

        if (!this.safeType(url))
            throw new Error(`The url can't be of type ${url.constructor.name}`);

        if (!this.safeType(text))
            throw new Error(`The text can't be of type ${text.constructor.name}`);

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