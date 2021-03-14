
// when babel transform jsx into js it generate 'h' object which generate html element
const { h } = require('jsx-dom');

const { existsSync } = require('fs');
const { color, generateDefaultUserdataFile, checkLatestVersion } = require(__dirname + '/../lib/util');
const remote = require('electron').remote
const manager = require(__dirname + '/../lib/manager');

const ROOT_DIRECTORY = __dirname + "/..";
const userWidgets = [];

const setup = () => {

    const CONFIG_PATH = ROOT_DIRECTORY + "/config.json";

    if (!existsSync(CONFIG_PATH)){
        
        console.error(color.red("Can't find config file at " + CONFIG_PATH));
        remote.getCurrentWindow().close();
    }
    
    const configuration = require(CONFIG_PATH);
    
    const USERDATA_PATH = ROOT_DIRECTORY + configuration.userdata;
    
    if (!existsSync(USERDATA_PATH))
        generateDefaultUserdataFile(USERDATA_PATH);
    
    checkLatestVersion(require(ROOT_DIRECTORY + "/package.json").version);
    
    const userdata = require(USERDATA_PATH);

    userWidgets = userdata.widgets;
    
    manager.loadWidgetsByName(userWidgets.filter(widget => !widget.disabled).map(({name}) => name));
    
    manager.initiateAll();
}

const changebackground = src => {

    const imageURL = "url('" + src + "')";
    document.body.style.backgroundImage = imageURL;
}

const populateWidgetManager = () => {

    const manageWidgetsListELement = document.getElementById(manageWidgetsList);

    manageWidgetsListELement.innerHTML = "";

    userWidgets.forEach(widget => {

        const liElement = document.createElement('li');
        liElement.className = "list-group-item mng-item";

        const widgetName = document.createTextNode(widget.name);

        liElement.appendChild(widgetName);

        const buttonElement = document.createElement("");
        buttonElement.className = "btn ml-1 mr-1 float-right";

        const iElement = document.createElement("i");
        iElement.className = "fa fa-trash-o fa-xs";

        buttonElement.appendChild(iElement);

        liElement.appendChild(buttonElement);
    });
}

window.onload = () => {

    setup();

    document.getElementById("refreshGridButton").onclick = () => refreshGrid();

    document.querySelectorAll('.prf-img').forEach(element => element.onclick = () => changebackground(element.src));

    document.getElementById("manageWidgetsModal").onclick = () => populateWidgetManager();
}