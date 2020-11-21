"use strict";

const Paragraph = require('../elements/paragraph');
const Anchor = require('../elements/anchor');
const Header = require('../elements/header');
const Footer = require('../elements/footer');
const Title = require('../elements/title');
const Image = require('../elements/image');
const Card = require('../elements/card');
const Body = require('../elements/body');
const Text = require('../elements/text');
const ListItem = require('../elements/listItem');
const List = require('../elements/list');

module.exports = class Plugin {

    /**
     * @param {string} src the URL of the source image
     */
    static card(child) {

        (this._card || (this._card = new Card())).add(child);
    }

    /**
     * @param {string} src the URL of the source image
     */
    static image(src) {

        this.card(new Image(src));
    }

    /**
     * @param {ListItem} item of any type to be in list
     */
    static listItem(item) {

        return new ListItem(item);
    }

    /**
     * @param {function} child to be nested in title it can be any function of title, text, anchor or paragraph
     */
    static list(...items) {

        items.forEach(item => {
            (this._list || (this._list = new List())).add(item)
        });
    
        return this._list;
    }

    /**
     * @param {function} child to be nested in title it can be any function of title, text, anchor or paragraph
     */
    static body(child) {

        (this._body || (this._body = new Body())).add(child);
        this.card(this._body);
    }

    /**
     * @param {color} color of the card
     */
    static background(color) {

        this._card.color(color);
    }

    /**
     * @param {string} text of card's title
     */
    static title(text) {

        return new Title(text);
    }

    /**
     * @param {string} text of paragraph
     */
    static paragraph(text) {

        return new Paragraph(text);
    }

    /**
     * @param {string} url of anchor
     * @param {string} text of anchor
     */
    static anchor(url, text) {

        return new Anchor(url, text);
    }

    /**
     * @param {function} child to be nested in header it can be any function of text, anchor or paragraph
     */
    static header(child) {

        (this._header || (this._header = new Header())).add(child);

        return this._header;
    }

    /**
     * @param {function} child to be nested in footer it can be any function of text, anchor or paragraph
     */
    static footer(child) {

        (this._footer || (this._footer = new Footer())).add(child);

        return this._footer;
    }

    /**
     * @param {string} text
     */
    static text(text) {

        return new Text(text);
    }

}
