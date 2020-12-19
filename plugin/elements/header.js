"use strict";

const Container = require('./containers/container');
const CardClass = require('../style/cardclass');

module.exports = class Header extends Container {

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