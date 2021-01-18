"use strict";

const Container = require("./container.js");

export default class TableItem extends Container {

    constructor(item) {
        super();
        this.setTypes(['String', 'Bold', 'Object']);

        if (!this.safeType(item))
            throw new Error(`${this.constructor.name} can't have child of type ${item.constructor.name}`);

        this.item = item;
    }

    getHead(){

        return Object.keys(this.item).map(key => `<th scope="col">${key}</th>`).join(' ');
    }

    toHtml() {

        return `<tr href="http://apple.com">${Object.values(this.item).map(value => `<td>${value}</td>`).join(' ')}</tr>`;
    }

}