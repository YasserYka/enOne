"use strict";

const Conatiner = require('./containers/container');

module.exports = class ListItem extends Conatiner {

    constructor(item) {
        super();

        this.item = item;
    }
    
    // item can be an anchor or string
    safeType(item) {

        return item.constructor.name === 'Anchor' ||
            item.constructor.name === 'Text';
    }

    toString(){

        return {[this.constructor.name]: {'item': this.item}};
    }

    toHtml() {

        return typeof this.item === 'string' ? 
            `<li class="list-group-item"> ${this.item.text} </li>`    
                :
            `<a target="_blank" href="${this.item.url}" class="list-group-item list-group-item-action"> ${this.item.text} </a>`;

    }

}