"use strict";

const Container = require("./container.js");
const CardClass = require("../stylie/cardclass.js");

module.exports = class Paragraph extends Container {

    constructor(text) {
        super();
        this.setTypes(['String', 'Bold']);

        if (!this.safeType(text))
            throw new Error(`${this.constructor.name} can't have child of type ${text.constructor.name}`);

            this.text = text;
    }

    toHtml() {

        return `
            <p class="${CardClass[this.constructor.name]}">
                ${this.text}
            </p>
        `;
    }
}