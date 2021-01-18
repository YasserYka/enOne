"use strict";

const Container = require("./container.js");
const CardClass = require("../stylie/cardclass.js");

export default class Footer extends Container {

    constructor() {
        
        super();
    }

    toHtml() {

        return `
            <div class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}