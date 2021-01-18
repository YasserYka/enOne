"use strict";

const Container = require("./container.js");
const CardClass = require("../stylie/cardclass.js");

module.exports = class Anchor extends Container {

    constructor(url, text) {
        super();
        this.setTypes(['String', 'Bold']);

        if (!this.safeType(url))
            throw new Error(`${this.constructor.name} can't have child of type ${url.constructor.name}`);

        if (!this.safeType(text))
            throw new Error(`${this.constructor.name} can't have child of type ${text.constructor.name}`);

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