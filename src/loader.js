const Widget = require('./widget');
const { readdirSync } = require('fs');

const encapsulateWidget = (widgetName) => {

    return new Widget(widgetName);
}

const getWidgetsInformation = () => {

    const widgetsDirectory = __dirname + '/../enOne-widgets/widgets';

    return readdirSync(widgetsDirectory).map(directoryName => ({
        directoryName: directoryName,
        disabled: true,
        dependencyInstalled: false,
        isLoading: false
    }));
}

module.exports = {
    getWidgetsInformation: getWidgetsInformation,
    encapsulateWidget: encapsulateWidget,
};