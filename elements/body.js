"use strict";

const Container = require('./containers/container');

// holds title, text, paragraph and achor
module.exports = class Body extends Container {

    constructor() {
        
        super();
    }

    toHtml() {

        return `
            <div class="card-body">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}