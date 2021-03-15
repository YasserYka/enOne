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

          let wrappedElement = muuriAdd(renderedWidget);

          observeElement(wrappedElement);
          
          widget.object.script().then(() => {

            console.log(color.green("Finished executing " + widget.object.constructor.name));
          });

        });

    });
  }

  // adds a widget at runtime
  add(widgetName){ 

    if (this.widgets.some(widget => widgetName === widget.name))
      console.log(color.blue("Widget name " + widgetName + " was already added!"));
    else {

      const widget = loader.load(widgetName);
      
      if (widget instanceof Error)
        console.error(color.red("Couldn't instantiate widget: " + widgetName + "\n" + widget))
      else {

        this.initiate(widget);
        this.widgets.push(widget);

        console.log(color.green("Widget name " + widgetName + " was added successfully!"));
      }
    }
  }

  // removes a widget at runtime
  remove(widgetName){ 

    const widgetIndex = this.widgets.findIndex(widget => widget.name === widgetName);

    if(widgetIndex === -1)
      console.error(color.red("Couldn't find widget named " + widgetName));
    else {
      
      // TODO: setInterval might be still running find a workaround

      this.widgets.splice(widgetIndex, 1);
      muuriRemove(widgetName);

      console.log(color.green("Widget name " + widgetName + " was removed successfully!"));
    }
  }

};

module.exports = new Manager();