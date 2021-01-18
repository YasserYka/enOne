"use strict.js";

const Container = require("./container.js");
const CardClass = require("../stylie/cardclass.js");

export default class List extends Container {

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