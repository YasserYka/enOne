"use strict";

const Paragraph = require('./elements/paragraph');
const Anchor = require('./elements/anchor');
const Header = require('./elements/header');
const Footer = require('./elements/footer');
const Title = require('./elements/title');
const Image = require('./elements/image');
const Card = require('./elements/card');
const Body = require('./elements/body');


class plugin {

    /**
     * @param {string} src the URL of the source image
     */
    card(child) {

        (this._card || (this._card = new Card())).add(child);
    }

    /**
     * @param {string} src the URL of the source image
     */
    image(src) {

        return new Image(src);
    }

    /**
     * @param {function} child to be nested in title it can be any function of title, text, anchor or paragraph
     */
    body(child) {

        (this._body || (this._body = new Body())).add(child);

        return this._body;
    }

    /**
     * @param {color} color of the card
     */
    color(color) {

        return color;
    }

    /**
     * @param {string} text of card's title
     */
    title(text) {

        return new Title(text);
    }

    /**
     * @param {string} text of paragraph
     */
    paragraph(text) {

        return new Paragraph(text);
    }

    /**
     * @param {string} url of anchor
     * @param {string} text of anchor
     */
    anchor(url, text) {

        return new Anchor(url, text);
    }

    /**
     * @param {function} child to be nested in header it can be any function of text, anchor or paragraph
     */
    header(child) {

        (this._header || (this._header = new Header())).add(child);

        return this._header;
    }

    /**
     * @param {function} child to be nested in footer it can be any function of text, anchor or paragraph
     */
    footer(child) {

        //return new Footer(child);
        (this._footer || (this._footer = new Footer())).add(child);

        return this._footer;
    }

}

module.exports = {
    plugin: plugin
}