"use strict";

module.exports = class PluginCard {

    image(src) {

        return new Image(src);
    }

    body(child) {

        return new Body(child);
    }

    color(color) {

        if (child.constructor.name !== "color")
            throw new Error('Parameter color must be of type color class');

        return color;
    }

    title(child) {

        return new Title(child);
    }

    paragraph(text) {

        return new Paragraph(text);
    }

    anchor(url, text) {

        return new Anchor(url, text);
    }

    header(child) {

        return new Header(child);
    }

    footer(child) {

        return new Footer(child);
    }

}