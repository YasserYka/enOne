"use strict";

const Container = require("./container.js");
const CardClass = require("../stylie/cardclass.js");

module.exports = class Header extends Container {

    constructor() {
        
        super();
    }

    toHtml() {

        return `
            <div class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}