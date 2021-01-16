"use strict";

import Container from "./container.js";
import CardClass from "../stylie/cardclass.js";

export default class Card extends Container {

    constructor() {
        
        super();
        this.addTypes(['Title', 'Header', 'Footer', 'Body', 'Image', 'Input', 'IFrame']);
    }

    toHtml() {
        
        return `
            <div class="${CardClass[this.constructor.name]}" style="margin: 0 auto;">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}