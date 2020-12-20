"use strict";

const Container = require("./container");

module.exports = class Bold extends Container {

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