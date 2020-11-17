"use strict";

const TextualConatiner = require("./containers/textualcontainer");

module.exports = class Title extends TextualConatiner {

    constructor(text) {

        if (!safeType(text))
            throw new Error(`The text can't be of type ${typeof text}`);

        this.text = text;
    }

    toHtml() {

        return `
            <h5 class="card-title">
                ${this.text}
            </h5>
        `;
    }

}