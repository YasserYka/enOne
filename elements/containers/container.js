"use strict";

// super class for nestedable elements
module.exports = class Container {

    add(child) {

        if (!this.safeType(child))
            throw new Error(`child of type ${children.constructor.name} can't be nested in ${this.constructor.name}`);

        (this.children || (this.children = [])).push(child);
    }

    childrenToHtml() {

        return this.children.map(child => child.toHtml());
    }

    // check the type of child because some objects can't be nested
    safeType(child) {

        return child.constructor.name == 'Paragraph' ||
            child.constructor.name == 'Anchor' ||
            child.constructor.name == 'Text';
    }

}