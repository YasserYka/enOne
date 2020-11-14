"use strict";

module.exports = class Card {

    image(src){

        this.imageSrc = src; 
    }

    title(text){

        this.cardTitle = text;
    }

    background(hex){
    
        this.backgroundColor = hex;
    }

    text(text){

        this.bodyText = text;
    }

    list(items){

        this.listItems = items;
    }

    anchor(url, text){

        this.anchor = { url: url, text: text ? text : url };
    }

    header(text){

    }

    footer(text){

    }

}