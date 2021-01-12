"use strict.js";

import Container from "./container.js";
import CardClass from "../stylie/cardclass.js";

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