"use strict";

module.exports = class Image {

    constructor(src, alt){
        
        if(!src)
            throw new Error("src can't be null or undifined");

        this.src = src;
        this.alt = alt;
    }

    toHtml(){
        return `
            <img src="${src}" class="card-img-top" alt="${alt}" />
        `;  
    }

}