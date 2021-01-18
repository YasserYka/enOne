"use strict";

const Paragraph = require('./elements/paragraph.js');
const Anchor = require('./elements/anchor.js');
const Header = require('./elements/header.js');
const Footer = require('./elements/footer.js');
const Title = require('./elements/title.js');
const Image = require('./elements/image.js');
const Card = require('./elements/card.js');
const Body = require('./elements/body.js');
const Text = require('./elements/text.js');
const Bold = require('./elements/bold.js');
const ListItem = require('./elements/listItem.js');
const List = require('./elements/list.js');
const TableItem = require('./elements/tableItem.js');
const Table = require('./elements/table.js');
const FontAwesome = require('./elements/fontawesome.js');
const Input = require('./elements/input.js');
const IFrame = require('./elements/iframe.js');
const LocalStorage = require('./elements/script/localstorage/localstorage.js');

export default class Plugin {
    
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

    static localStorage(item) {

        return new LocalStorage(item);
    }    

    /**
     * @param {function} items list or multiple of list item
     */
    static list(items) {

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

    static localStorageOperation(){

        return LocalStorage.operation();
    }

    /**
     * @param {function} child of type ~
     */
    static header(...children) {

        children.forEach(child => (this._header || (this._header = new Header())).add(child));
        this.card(this._header);   
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
    static table(items) {

        items.forEach(item => {
            (this._table || (this._table = new Table())).add(item);
        });

        this.body(this._table);   
    }

    static input(placeholder) {

        
        this.card(new Input(placeholder));
    }

    static iframe(url){

        this.card(new IFrame(url)); 
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
     * @param {string} text
     */
    static bold(text) {

        return new Bold(text);
    }

    /**
     * @param {string} icon name (e.g., camera)
     * @param {number} size of icon, number between 1 and 5
     */
    static fontawesome(icon, size) {

        return new FontAwesome(icon, size || 3);
    }

    static toHtml(){

        return this._card.toHtml();
    }
    
}
