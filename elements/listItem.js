"use strict";

const TextualConatiner = require('./containers/textualcontainer');

// item can be an anchor or string
module.exports = class ListItem extends TextualConatiner {

    constructor(item) {
        super();

        this.item = item;
    }
    
    // check the type of child because some objects can't be nested
    safeType(item) {

        return item.constructor.name === 'Anchor' || typeof item === 'string';
    }

    toHtml() {

        return typeof this.item === 'string' ? 
            `<li class="list-group-item"> ${element} </li>`    
                :
            `<a href="${this.item.url}" class="list-group-item list-group-item-action"> ${this.item.text} </a>`;

    }

}