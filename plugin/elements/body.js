"use strict";

import Container from "./container.js";
import CardClass from "../stylie/cardclass.js";

// holds title, text, paragraph and achor
export default class Body extends Container {

    constructor() {
        
        super();
        this.addTypes(['Title', 'List', 'Table', 'Text', 'Bold']);
    }

    toHtml() {

        return `
            <div class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}