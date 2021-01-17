"use strict";

import Container from "./container.js";
import CardClass from "../stylie/cardclass.js";

export default class Header extends Container {

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