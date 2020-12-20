"use strict";

const Conatiner = require('./containers/textualcontainer');

module.exports = class Bold extends Conatiner {

    constructor(text) {
        super();
        this.setTypes(['String']);

        if (!this.safeType(text))
            throw new Error(`The text can't be of type ${text.constructor.name}`);

        this.text = text;
    }

    toHtml() {

        return `
            <b>${this.text}</b>
        `;
    }

}