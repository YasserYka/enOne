"use strict";

const Container = require("./container/container");
const CardClass = require('../style/styleclass');

module.exports = class ListItem extends Container {

    constructor(item) {
        super();

        this.item = item;
    }

    toHtml() {

        return typeof this.item === 'string' ? 
            `<li class="${CardClass[this.constructor.name]['li']}"> ${this.item.text} </li>`    
                :
            `<a target="_blank" href="${this.item.url}" class="${CardClass[this.constructor.name]['a']}"> ${this.item.text} </a>`;

    }

}