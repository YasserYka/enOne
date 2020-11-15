"use strict";

module.exports = class Header {

    constructor(text){
        
        this.text = text;
    }

    toHtml(){
        return `
            <div class="card-header">
                ${this.text}
            </div>
        `;
    }

}