const loader = require("./loader");
const got = require("got");
const { exec } = require('child_process');
const { color } = require("./util");
const { transform } = require("./compile");
const fs = require("fs");

const COMPILED_WIDGETS_DIRECTORU = __dirname + "/../output";
const WIDGETS_SUBMODULE_DIRECTORY = __dirname + "/../enOne-widgets/widgets";

class Manager {

  constructor(){

    this.widgets = [];
  }

  loadWidgetsByName(widgets){

    if(!fs.existsSync(COMPILED_WIDGETS_DIRECTORU))
      fs.mkdirSync(COMPILED_WIDGETS_DIRECTORU);

    widgets.forEach(widgetName => {
      
      const widget = loader.loadWidgetByName(widgetName);

      if (widget instanceof Error && widget.message == "Couldn't find compiled widget file"){
        transform(`${WIDGETS_SUBMODULE_DIRECTORY}/${widgetName}/${widgetName}.js`, COMPILED_WIDGETS_DIRECTORU + "/" + widgetName + ".js", ()=>{
          const compiledWidget = loader.loadWidgetByName(widgetName);

          this.initiateAndPushWidget(compiledWidget);
        });
      }
      else
        this.initiateAndPushWidget(widget);
    });
  }

  initiateAndPushWidget(widget){
    this.initiate(widget);

    this.widgets.push(widget);
  }

  initiate(widget) {

    widget.object.initialize(widget.config).then(() => {

      widget.object.render().then((renderedWidget) => {

          let wrappedElement = addGridItem(renderedWidget, widget.name);

          observeElement(wrappedElement);
          
          widget.object.script().then(() => {

            console.log("Finished executing " + widget.object.constructor.name);
          });

        });

    });
  }

  // adds a widget at runtime
  add(widgetName){ 

    if (this.widgets.some(widget => widgetName === widget.name))
      console.log("Widget name " + widgetName + " was already added!");
    else {

      const widget = loader.loadWidgetByName(widgetName);
      
      if (widget instanceof Error)
        console.error("Couldn't instantiate widget: " + widgetName + "\n" + widget);
      else {

        this.initiate(widget);
        this.widgets.push(widget);

        console.log("Widget name " + widgetName + " was added successfully!");
      }
    }
  }

  // removes a widget at runtime
  remove(widgetName){ 

    const widgetIndex = this.widgets.findIndex(widget => widget.name === widgetName);

    if(widgetIndex === -1)
      console.error("Couldn't find widget named " + widgetName);
    else {
      
      // TODO: setInterval might be still running find a workaround

      this.widgets.splice(widgetIndex, 1);
      removeGridItem(widgetName);

      console.log("Widget name " + widgetName + " was removed successfully!");
    }
  }

};

module.exports = new Manager();