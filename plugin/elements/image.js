"use strict";

const TextualConatiner = require("./containers/textualcontainer");
const CardClass = require('../style/cardclass');

module.exports = class Image extends TextualConatiner {

    constructor(src, alt) {
        super();

        if (!this.safeType(src))
            throw new Error(`The URL can't be of type ${typeof url}`);

        this.src = src;
        this.alt = alt ? alt : "Card-Image";
    }

    toString(){

        return {[this.constructor.name]: {'src': this.src, 'alt': this.alt}};
    }

    toHtml() {

        return `
            <img src="${this.src}" class="${CardClass[this.constructor.name]}" alt="${this.alt}" />
        `;
    }

}