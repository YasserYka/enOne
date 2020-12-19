"use strict";

// super class for nestedable elements
module.exports = class TextualConatiner {

    safeType(child) {

        return child.constructor.name === 'String';
    }

}