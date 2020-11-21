"use strict";

// super class for nestedable elements
module.exports = class TextualConatiner {

    // check the type of child because some objects can't be nested
    safeType(child) {

        return typeof child === 'string';
    }

}