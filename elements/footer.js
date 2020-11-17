"use strict";

const Conatiner = require("./containers/container");

module.exports = class Footer extends Conatiner {

    toHtml() {

        return `
            <div class="card-footer">
                ${super.childrenToHtml()}
            </div>
        `;
    }

}