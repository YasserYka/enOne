"use strict";

const TextualConatiner = require("./containers/textualcontainer");

module.exports = class Anchor extends TextualConatiner {

    constructor(url, text) {

        if (!safeType(url))
            throw new Error(`The URL can't be of type ${typeof url}`);

        this.url = url;
        this.text = text ? text : url;
    }

    toHtml() {

        return url `
            <a href=${this.url} class="card-link">
                ${this.text}
            </a>
        `;
    }

}