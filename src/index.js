
// when babel transform jsx into js it generate 'h' object which generate html element
const { h } = require('jsx-dom');

const { existsSync } = require('fs');
const { color, generateDefaultUserdataFile, checkLatestVersion, cloneWidgetsSubmoduleRepository, pullWidgetsSubmoduleRepository } = require(__dirname + '/../src/util');
const remote = require('electron').remote
const manager = require(__dirname + '/../src/manager');
const fs = require("fs");

const ROOT_DIRECTORY = __dirname + "/..";
const COMPILED_WIDGETS_DIRECTORY = __dirname + "/../output";

const setup = () => {

    getAndSetBackgroundImage();

    // when user first install the application this directory will not exists
    if(!fs.existsSync(COMPILED_WIDGETS_DIRECTORY)) {
        fs.mkdirSync(COMPILED_WIDGETS_DIRECTORY);
    }

    const CONFIG_PATH = ROOT_DIRECTORY + "/config.json";

    if (!existsSync(CONFIG_PATH)){
        
        console.error(color.red("Can't find config file at " + CONFIG_PATH));
        remote.getCurrentWindow().close();
    }
    
    const configuration = require(CONFIG_PATH);
    
    const USERDATA_PATH = ROOT_DIRECTORY + configuration.userdataPath;
    
    if (!existsSync(USERDATA_PATH)) {
        generateDefaultUserdataFile(USERDATA_PATH);
    }
    
    checkLatestVersion(require(ROOT_DIRECTORY + "/package.json").version);
    
    const userdata = require(USERDATA_PATH);

    manager.setUserdata(userdata);
    
    manager.loadAndInitiateWidgets();   
    
    document.getElementById("manageWidgetsButton").onclick = () => populateWidgetManager();
}

const setBackgroundImage = (src) => {

    const imageURL = "url('" + src + "')";
    document.body.style.backgroundImage = imageURL;
}

const getAndSetBackgroundImage = () => {

    const backgroundImageSrc = localStorage.getItem("background-image");

    if (backgroundImageSrc)
        setBackgroundImage(backgroundImageSrc);
}

const populateWidgetManager = () => {

    const manageWidgetsListELement = document.getElementById("manageWidgetsList");

    manageWidgetsListELement.innerHTML = "";

    manager.userdata.widgets.forEach(widget => {

        const liElement = document.createElement('li');
        liElement.className = "list-group-item mng-item";

        const widgetName = document.createTextNode(widget.directoryName);

        liElement.appendChild(widgetName);

        const buttonElement = document.createElement("button");
        buttonElement.className = "btn ml-1 mr-1 float-right";

        const iElement = document.createElement("i");
        let iElementClassName;
        
        if (widget.disabled) {
            iElementClassName = "fa fa-plus fa-xs";
        } else {
            iElementClassName = "fa fa-trash-o fa-xs";
        }

        buttonElement.onclick = () => {
            if (widget.disabled) {
                manager.add(widget.directoryName);
            } else {
                manager.remove(widget.directoryName);
            }

            populateWidgetManager();
        }
           
        iElement.className = iElementClassName;

        buttonElement.appendChild(iElement);

        liElement.appendChild(buttonElement);

        manageWidgetsListELement.appendChild(liElement);
    });
}

window.onload = () => {

    setup();

    document.getElementById("refreshGridButton").onclick = () => refreshGrid();

    document.querySelectorAll('.prf-img').forEach(element => element.onclick = () => {
        
        localStorage.setItem("background-image", element.src);
        setBackgroundImage(element.src);
    });
}