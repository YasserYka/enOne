"use strict";

module.exports = class PluginCard {

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

        return new Body(child);
    }

    /**
     * @param {color} color color of the card
     */
    color(color) {

        if (child.constructor.name !== "color")
            throw new Error('Parameter color must be of type color class');

        return color;
    }

    /**
     * @param {function} child to be nested in title it can be any function of text, anchor or paragraph
     */
    title(child) {

        return new Title(child);
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

        return new Header(child);
    }

    /**
     * @param {function} child to be nested in footer it can be any function of text, anchor or paragraph
     */
    footer(child) {

        return new Footer(child);
    }

}