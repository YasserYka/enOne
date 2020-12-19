"use strict";

const TextualConatiner = require("./containers/textualcontainer");
const CardClass = require('../style/cardclass');

module.exports = class Image extends TextualConatiner {

    constructor(src, alt) {
        super();

        if (!this.safeType(src))
            throw new Error(`The URL can't be of type ${url.constructor.name}`);

        this.src = src;
        this.alt = alt ? alt : "Card-Image";
    }

    toHtml() {

        return `
            <img src="${this.src}" class="${CardClass[this.constructor.name]}" alt="${this.alt}" />
        `;
    }

}