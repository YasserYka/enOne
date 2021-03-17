module.exports = class WidgetNotCompiled extends Error {
    constructor(widgetName) {

        super(widgetName + " is not compiled!");
    }
}