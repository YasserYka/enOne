"use strict";

const Conatiner = require('./containers/container');
const TextColor = require('../stylie/textcolor');

module.exports = class ListItem extends Conatiner {

    constructor(item, textcolor) {
        super();

        this.item = item;
        this.textcolor = textcolor ? TextColor.textColorFor(textcolor) : TextColor.color.DARK_TEXT;
    }
    
    // item can be an anchor or string
    safeType(item) {

        return item.constructor.name === 'Anchor' ||
            item.constructor.name === 'Text';
    }

    toHtml() {

        return typeof this.item === 'string' ? 
            `<li class="${this.textcolor} list-group-item"> ${this.item.text} </li>`    
                :
            `<a target="_blank" href="${this.item.url}" class="${this.textcolor} list-group-item list-group-item-action"> ${this.item.text} </a>`;

    }

}