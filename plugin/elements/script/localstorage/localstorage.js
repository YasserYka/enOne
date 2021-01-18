"use strict";

const Container = require("../../container.js");

module.exports = class LocalStorage extends Container {

    constructor(operation, key, value) {
        super();

        this.key = key;
        this.value = value;
        this.operation = operation;
    }

    static operation(){
        return Object.freeze({
            SET: 'localStorage.setItem(${this.key}, ${this.value});',
            GET: 'localStorage.getItem(${this.key});',
            REMOVE: 'localStorage.removeItem(${this.key});'
        }); 
    }
    

    toHtml() {

        return `
            <h5 class="${CardClass[this.constructor.name]}">
                ${this.child.constructor.name === 'Anchor' ? this.child.toHtml() : this.child}
            </h5>
        `;
    }

}