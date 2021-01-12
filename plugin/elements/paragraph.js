"use strict";

import Container from "./container.js";
import CardClass from "../stylie/cardclass.js";

export default class Paragraph extends Container {

    constructor(text) {
        super();
        this.setTypes(['String']);

        if (!this.safeType(text))
            throw new Error(`${this.constructor.name} can't have child of type ${text.constructor.name}`);

            this.text = text;
    }

    toHtml() {

        return `
            <p class="${CardClass[this.constructor.name]}">
                ${this.text}
            </p>
        `;
    }
}