"use strict";

const Container = require("./container");
const CardClass = require('../style/styleclass');

module.exports = class Footer extends Container {

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