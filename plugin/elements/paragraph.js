"use strict";

const Conatiner = require("./containers/container");
const CardClass = require('../style/styleclass');

module.exports = class Paragraph extends Conatiner {

    constructor(text) {
        super();

        if (this.safeType(text))
            throw new Error(`The text can't be of type ${text.constructor.name}`);

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