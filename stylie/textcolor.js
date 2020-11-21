"use strict";

const cardcolor = require('../elements/cardcolor');

/**
 * @param {color} bgcolor is a background color
 */
// TODO: map bg color to apropiate text color
const textColorFor = bgcolor => {
    console.log('t', bgcolor)

    return bgcolor == 'bg-light' ? colors.DARK_TEXT : colors.WHITE_TEXT; 
}

const colors =  Object.freeze({
    BLUE_TEXT: "text-primary",
    GRAY_TEXT: "text-secondary",
    GREEN_TEXT: "text-success",
    RED_TEXT: "text-danger",
    YELLOW_TEXT: "text-warning",
    LIGHT_BLUE_TEXT: "text-info",
    WHITE_TEXT: "text-white",
    DARK_TEXT: "text-dark",
    MUTED_TEXT: "text-muted"
}); 

module.exports = {
    color: colors,
    textColorFor: textColorFor
}