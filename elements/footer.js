"use strict";

const Container = require('./containers/container');

module.exports = class Footer extends Container {

    constructor() {
        
        super();
    }

    toHtml() {

        return `
            <div class="card-footer">
                <i class="fa fa-spotify fa-2x" aria-hidden="true"></i>
            </div>
        `;
    }

}