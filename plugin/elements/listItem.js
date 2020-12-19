"use strict";

const Conatiner = require('./containers/container');
const CardClass = require('../style/cardclass');

module.exports = class ListItem extends Conatiner {

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