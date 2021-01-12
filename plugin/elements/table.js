"use strict";

import Container from "./container.js";
import CardClass from "../stylie/cardclass.js";

export default class Table extends Container {

    constructor() {
        
        super();
        this.setTypes(['TableItem']);
    }

    toHtml() {

        return `
            <div class="table-responsive">
            <table class="${CardClass[this.constructor.name]}">
                <thead>
                    <tr>
                        ${this.children[0].getHead()}
                    </tr>
                </thead>
                <tbody>
                    ${this.childrenToHtml()}
                </tbody>
            </table>
            </div>
        `;
    }

}