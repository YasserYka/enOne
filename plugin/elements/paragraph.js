"use strict";

const Container = require("./container/container");
const CardClass = require('../stylie/cardclass');

module.exports = class Paragraph extends Container {

    constructor(text) {
        super();
        this.setTypes(['String']);

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