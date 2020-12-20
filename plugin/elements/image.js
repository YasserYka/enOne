"use strict";

const Container = require("./container");
const CardClass = require('../style/styleclass');

module.exports = class Image extends Container {

    constructor(src, alt) {
        super();
        this.setTypes(['String']);

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