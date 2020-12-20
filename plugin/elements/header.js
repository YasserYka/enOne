"use strict";

const Container = require("./container");
const CardClass = require('../style/styleclass');

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