"use strict";

const TextualConatiner = require('./containers/textualcontainer');

module.exports = class ListItem extends TextualConatiner {

    constructor(item) {
        super();

        this.item = item;
    }
    
    // item can be an anchor or string
    safeType(item) {

        return item.constructor.name === 'Anchor' ||
            item.constructor.name === 'Text';
    }

    toHtml() {

        return typeof this.item === 'string' ? 
            `<li class="text-white list-group-item"> ${this.item.text} </li>`    
                :
            `<a target="_blank" href="${this.item.url}" class="text-white list-group-item list-group-item-action"> ${this.item.text} </a>`;

    }

}