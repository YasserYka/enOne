"use strict";

const TextualConatiner = require("./containers/textualcontainer");
const CardClass = require('../style/styleclass');

module.exports = class Paragraph extends TextualConatiner {

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