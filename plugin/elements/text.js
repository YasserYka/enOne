"use strict";

const TextualConatiner = require("./containers/textualcontainer");

module.exports = class Text extends TextualConatiner {

    constructor(text) {
        super();

        if (!this.safeType(text))
            throw new Error(`The text can't be of type ${typeof text}`);

        this.text = text;
    }
    
    toString(){

        return {[this.constructor.name]: {'text': this.text}};
    }

    toHtml() {

        return this.text;
    }

}