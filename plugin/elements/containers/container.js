"use strict";

// super class for nestedable elements
module.exports = class Container {

    constructor(){

        this.children = []
    }

    add(child) {

        if (!this.safeType(child))
            throw new Error(`child of type ${child.constructor.name} can't be nested in ${this.constructor.name}`);

        if (!this.children.includes(child)) 
            this.children.push(child);

    }

    childrenToString() {

        return this.children.map(child => child.toString()).join(' ');
    }

    childrenToHtml() {

        return this.children.map(child => child.toHtml()).join(' ');
    }

    // check the type of child because some objects can't be nested
    safeType(child) {

        return child.constructor.name == 'Paragraph' ||
            child.constructor.name == 'Anchor' ||
            child.constructor.name == 'Text' || 
            typeof child == 'string' ||
            child.constructor.name == 'FontAwesome';
    }

}