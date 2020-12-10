"use strict";

const Container = require('./containers/container');

module.exports = class Footer extends Container {

    constructor() {
        
        super();
    }

    toHtml() {

        return `
            <div class="card-footer text-white">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}