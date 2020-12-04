"use strict";

const Paragraph = require('./elements/paragraph');
const Anchor = require('./elements/anchor');
const Header = require('./elements/header');
const Footer = require('./elements/footer');
const Title = require('./elements/title');
const Image = require('./elements/image');
const Card = require('./elements/card');
const Body = require('./elements/body');
const Text = require('./elements/text');
const ListItem = require('./elements/listItem');
const List = require('./elements/list');
const TableItem = require('./elements/tableItem');
const Table = require('./elements/table');
const FontAwesome = require('./elements/fontawesome');

module.exports = class Plugin {
    
    static _initializer = (() => {
        
        this._card = new Card();
        this._body = new Body();
    })();

    /**
     * @param {function} child 
     */
    static card(child) {

        this._card.add(child);
    }

    /**
     * @param {string} src of image
     */
    static image(src) {

        this.card(new Image(src));
    }

    /**
     * @param {string} item of type string
     */
    static listItem(item) {

        return new ListItem(item);
    }

    /**
     * @param {function} items list or multiple of list item
     */
    static list(...items) {

        items.forEach(item => {
            (this._list || (this._list = new List())).add(item)
        });

        this.body(this._list);
    }

    /**
     * @param {function} child
     */
    static body(child) {

        this._body.add(child);
        this.card(this._body);
    }

    /**
     * @param {function} child of type ~ 
     */
    static title(child) {
        
        this.body(new Title(child));
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
     * @param {function} child of type ~
     */
    static header(child) {

        (this._header || (this._header = new Header())).add(child);

        return this._header;
    }

    /**
     * @param {object} items of table
     */
    static tableItem(item) {

        return new TableItem(item);  
    }

    /**
     * @param {function} items of type tableItem
     */
    static table(...items) {

        items.forEach(item => {
            (this._table || (this._table = new Table())).add(item)
        });

        this.body(this._table);   
    }

    /**
     * @param {function} child of type ~
     */
    static footer(child) {

        (this._footer || (this._footer = new Footer())).add(child);
        this.card(this._footer);
    }

    /**
     * @param {string} text
     */
    static text(text) {

        return new Text(text);
    }

    /**
     * @param {string} icon name (e.g., camera)
     * @param {number} size of icon, number between 1 and 5
     */
    static fontawesome(icon, size) {

        return new FontAwesome(icon, size);
    }

    /**
     * @param {string} icon name (e.g., camera)
     */
    static fontawesome(icon) {

        return new FontAwesome(icon);
    }

    static toHtml(){

        return this._card.toHtml();
    }
    
}
