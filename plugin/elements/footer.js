"use strict";

const Container = require('./containers/container');
const CardClass = require('../style/cardclass');

module.exports = class Footer extends Container {

    constructor() {
        
        super();
    }

    toString() {

        return {[this.constructor.name]: {'children': this.childrenToString()}};
    }

    toHtml() {

        return `
            <div class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}