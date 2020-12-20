"use strict";

const Container = require("./container/container");

module.exports = class TableItem extends Container {

    constructor(item) {
        super();
        this.setTypes(['String', 'Bold']);

        if (!this.safeType(item))
            throw new Error(`${this.constructor.name} can't have child of type ${item.constructor.name}`);

        this.item = item;
    }

    getHead(){

        return Object.keys(this.item).map(key => `<th scope="col">${key}</th>`).join(' ');
    }

    toHtml() {

        return `<tr>${Object.values(this.item).map(value => `<td>${value}</td>`).join(' ')}</tr>`;
    }

}