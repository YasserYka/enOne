"use strict";

const Container = require('./containers/container');

module.exports = class Header extends Container {

    constructor() {
        
        super();
    }

    toString() {

        return {[this.constructor.name]: {'children': this.childrenToString()}};
    }

    toHtml() {

        return `
            <div class="card-header">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}