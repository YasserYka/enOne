"use strict";

const Conatiner = require("./containers/container");

module.exports = class Header extends Conatiner {

    toHtml() {

        return `
            <div class="card-header">
                ${super.childrenToHtml()}
            </div>
        `;
    }

}