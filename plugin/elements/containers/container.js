"use strict";

// super class for nestedable elements
module.exports = class Container {

    constructor(){

        this.children = []
        this.safeConstructorTypesChildren = [
            'Paragraph',
            'Anchor',
            'Text',
            'FontAwesome',
            'String'
        ];
    }

    addTypes(types){

        this.safeConstructorTypesChildren.push(...types);
    }

    add(child) {

        if (this.safeType(child))
            throw new Error(`child of type ${child.constructor.name} can't be nested in ${this.constructor.name}`);

        if (!this.children.includes(child)) 
            this.children.push(child);

    }

    childrenToHtml() {

        return this.children.map(child => child.toHtml()).join(' ');
    }

    // check the type of child because some objects can't be nested
    safeType(child) {

        return !this.safeConstructorTypesChildren.some(type => type === child.constructor.name);
    }

}