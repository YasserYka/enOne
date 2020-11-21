"use strict";

const TextualConatiner = require('./containers/textualcontainer');

module.exports = class FontAwesome extends TextualConatiner {

    /**
     * @param {string} icon name (e.g., camera) 
     */
    constructor(icon) {
        super();

        this.icon = icon;
    }

    /**
     * @param {string} icon name (e.g., camera)
     * @param {number} size of icon, must be a number between 1 and 5
     */
    constructor(icon, size) {
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
            4: "fa-5x"
        }[size];
    }

    toHtml() {

        return `
            <i class="fa fa-${this.icon} ${this.size || ''}" aria-hidden="true"></i>
        `;
    }

}