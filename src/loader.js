const Widget = require('./widget');

// loads compiled file of widget and config file from enOne-widgets folder
const loadWidget = (widgetDirectoryName) => {
    return new Widget(widgetDirectoryName);
}

const getWidgetsInformation = () => {

    return fs.readdirSync(widget.WidgetDirectory).map(directoryName => ({
        directoryName: directoryName,
        disabled: true,
        dependencyInstalled: false
    }));
}

module.exports = {
    getWidgetsInformation: getWidgetsInformation,
    loadWidget: loadWidget,
};