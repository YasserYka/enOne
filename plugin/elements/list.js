"use strict";

const Container = require("./container/container");
const CardClass = require('../style/styleclass');

module.exports = class List extends Container {

    constructor() {
        
        super();
        this.setTypes(['ListItem']);
    }

    toHtml() {

        return `
            <ul class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </ul>
        `;
    }

}