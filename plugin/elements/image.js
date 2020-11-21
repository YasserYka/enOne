"use strict";

const TextualConatiner = require("./containers/textualcontainer");

module.exports = class Image extends TextualConatiner {

    constructor(src, alt) {
        super();

        if (!this.safeType(src))
            throw new Error(`The URL can't be of type ${typeof url}`);

        this.src = src;
        this.alt = alt ? alt : "Card-Image";
    }

    toHtml() {

        return `
            <img src="${this.src}" class="card-img-top" alt="${this.alt}" />
        `;
    }

}