
// when babel transform jsx into js it generate 'h' object which generate html element
const { h } = require('jsx-dom');

const { existsSync } = require('fs');
const { color, generateDefaultUserdataFile, checkLatestVersion, cloneWidgetsSubmoduleRepository, pullWidgetsSubmoduleRepository } = require(__dirname + '/../src/util');
const remote = require('electron').remote
const manager = require(__dirname + '/../src/manager');
const fs = require("fs");

const ROOT_DIRECTORY = __dirname + "/..";
const WIDGETS_SUBMODULE_DIRECTORY = ROOT_DIRECTORY + "/enOne-widgets"; 
const COMPILED_WIDGETS_DIRECTORU = __dirname + "/../output";

let userWidgets = [];
let pageNumber = 0;

const setup = () => {

    getAndSetBackgroundImage();

    // when user first install the application this directory will not exists
    if(!fs.existsSync(COMPILED_WIDGETS_DIRECTORU))
      fs.mkdirSync(COMPILED_WIDGETS_DIRECTORU);

    // if widgets directory not found or currepted try to clone it or fetch it
    if (!existsSync(WIDGETS_SUBMODULE_DIRECTORY)){
    
        console.error('Can\'t find widgets submodule directory file at ' + WIDGETS_SUBMODULE_DIRECTORY + '/nwill attempt to clone it from remote repository');
        cloneWidgetsSubmoduleRepository();
    
        if (!existsSync(WIDGETS_SUBMODULE_DIRECTORY + "/widgets")){
    
            console.error('Can\'t find widgets directory file at ' + WIDGETS_SUBMODULE_DIRECTORY + '/widgets/nwill attempt to pull it from remote repository');
            pullWidgetsSubmoduleRepository();
        }
    
        if (!existsSync(WIDGETS_SUBMODULE_DIRECTORY) || !existsSync(WIDGETS_SUBMODULE_DIRECTORY + "/widgets")){
         
            console.error("Failed to pull/clone widgets submodule directory");
            remote.getCurrentWindow().close();
        }
    }

    const CONFIG_PATH = ROOT_DIRECTORY + "/config.json";

    if (!existsSync(CONFIG_PATH)){
        
        console.error(color.red("Can't find config file at " + CONFIG_PATH));
        remote.getCurrentWindow().close();
    }
    
    const configuration = require(CONFIG_PATH);
    
    const USERDATA_PATH = ROOT_DIRECTORY + configuration.userdataPath;
    
    if (!existsSync(USERDATA_PATH))
        generateDefaultUserdataFile(USERDATA_PATH);
    
    checkLatestVersion(require(ROOT_DIRECTORY + "/package.json").version);
    
    const userdata = require(USERDATA_PATH);

    userWidgets = userdata.widgets;
    
    manager.loadAndInitiateWidgetsByName(userWidgets.filter(widget => !widget.disabled).map(({name}) => name));

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

    userWidgets.forEach(widget => {

        const liElement = document.createElement('li');
        liElement.className = "list-group-item mng-item";

        const widgetName = document.createTextNode(widget.name);

        liElement.appendChild(widgetName);

        const buttonElement = document.createElement("button");
        buttonElement.className = "btn ml-1 mr-1 float-right";
        buttonElement.setAttribute("widget-name", widget.name);
        
        buttonElement.addEventListener('click', (element) => {
            element.preventDefault();
            manager.remove(element.target.getAttribute('widget-name'));
        }, false);

        const iElement = document.createElement("i");
        iElement.className = "fa fa-trash-o fa-xs";

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