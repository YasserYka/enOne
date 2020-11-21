"use strict";

const Container = require('./containers/container');

module.exports = class Header extends Container {

    constructor() {
        
        super();
    }

    toHtml() {

        return `
            <div class="card-header">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}