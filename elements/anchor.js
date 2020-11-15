"use strict";

module.exports = class Anchor {

    constructor(url, text){

        if(!url)
            throw new Error("url can't be null or undifined");

        this.url = url;
        this.text = text ? text : url; 
    }

    toHtml(){
        return `
            <a href=${this.url} class="btn btn-primary">
                ${this.text}
            </a>
        `;
    }

}