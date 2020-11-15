"use strict";

module.exports = class Text {

    constructor(text){

        this.text = text;
    }

    toHtml(){

        return this.text;
    }
}