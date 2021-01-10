"use strict";

const Container = require("./container/container");
const CardClass = require('../stylie/cardclass');

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