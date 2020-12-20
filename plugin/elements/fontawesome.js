"use strict";

const Conatiner = require('./containers/textualcontainer');

const DEFAULT_ICON_SIZE = 3;

module.exports = class FontAwesome extends Conatiner {

    constructor(icon, size = DEFAULT_ICON_SIZE) {
        super();

        if(typeof size != "number" || size < 1 || size > 5)
            throw new Error('size must be of type int or size must be of type between 1 and 5')

        this.icon = icon;
        this.size = this.getSizeFor(size);
    }

    getSizeFor(size){
        return {
            1: "fa-sm", 
            2: "fa-lg",
            3: "fa-2x",
            4: "fa-3x",
            5: "fa-5x"
        }[size];
    }

    toHtml() {

        return `
            <i class="fa fa-${this.icon} ${this.size || ''}" aria-hidden="true"></i>
        `;
    }

}