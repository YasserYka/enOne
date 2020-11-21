"use strict";

const defaultColor = () => {
    
    return colors.DARK_TEXT; 
}

const whiteColor = () => {
    
    return colors.WHITE_TEXT; 
}

const colors =  Object.freeze({
    BLUE_TEXT: "--primary",
    GRAY_TEXT: "--secondary",
    GREEN_TEXT: "--success",
    RED_TEXT: "--danger",
    YELLOW_TEXT: "--warning",
    LIGHT_BLUE_TEXT: "--info",
    WHITE_TEXT: "--white",
    DARK_TEXT: "--dark",
    MUTED_TEXT: "--muted"
}); 

module.exports = {
    color: colors,
    defaultColor: defaultColor,
    whiteColor: whiteColor
}