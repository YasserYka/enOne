"use strict";

const TextualConatiner = require('./containers/textualcontainer');

module.exports = class Footer extends TextualConatiner {

    constructor(icon) {
        super();

        this.icon = icon;
    }

    toHtml() {

        // TODO: editable size
        return `
            <i class="fa fa-${this.icon}" aria-hidden="true"></i>
        `;
    }

}