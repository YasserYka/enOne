"use strict";

const Container = require("./container.js");

const DEFAULT_ICON_SIZE = 3;

module.exports = class FontAwesome extends Container {

    constructor(icon, size = DEFAULT_ICON_SIZE) {
        super();
        this.setTypes(['String']);

        if(size.constructor.name !== "Number" || size < 1 || size > 5)
            throw new Error('size must be of type int or size must be of type between 1 and 5')
   
        if (!this.safeType(icon))
            throw new Error(`${this.constructor.name} can't have child of type ${icon.constructor.name}`);

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