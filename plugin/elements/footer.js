"use strict";

const Container = require('./containers/container');

module.exports = class Footer extends Container {

    constructor() {
        
        super();
    }

    toString() {

        return {[this.constructor.name]: {'children': this.childrenToString()}};
    }

    toHtml() {

        return `
            <div class="card-footer text-white">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}