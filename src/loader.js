const Widget = require('./widget');

// loads compiled file of widget and config file from enOne-widgets folder
const loadWidget = (widgetName) => {

    return new Widget(widgetName);
}

const getWidgetsInformation = () => {

    const widgetsDirectory = __dirname + '/../enOne-widgets/widgets';

    return fs.readdirSync(widgetsDirectory).map(directoryName => ({
        directoryName: directoryName,
        disabled: true,
        dependencyInstalled: false
    }));
}

module.exports = {
    getWidgetsInformation: getWidgetsInformation,
    loadWidget: loadWidget,
};