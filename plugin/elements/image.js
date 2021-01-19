

const Container = require("./container.js");
const CardClass = require("../stylie/cardclass.js");

module.exports = class Image extends Container {

    constructor(src, alt) {
        super();
        this.setTypes(['String']);

        if (!this.safeType(src))
            throw new Error(`${this.constructor.name} can't have child of type ${src.constructor.name}`);

        this.src = src;
        this.alt = alt ? alt : "Card-Image.js";
    }

    toHtml() {

        return `
            <img src="${this.src}" class="${CardClass[this.constructor.name]}" alt="${this.alt}" />
        `;
    }

}