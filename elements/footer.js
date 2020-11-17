"use strict";

module.exports = class Footer extends Conatiner {

    toHtml() {

        return `
            <div class="card-footer">
                ${super.childrenToHtml()}
            </div>
        `;
    }

}