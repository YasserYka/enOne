const loader = require("./loader");
const { transform } = require("./compile");

const WIDGETS_DIRECTORY = __dirname + "/../enOne-widgets/widgets";

class Manager {

  constructor(){ this.widgets = []; }

  loadAndInitiateWidgets(widgets){

    widgets.forEach(widget => {
      
      const widgetInstance = loader.loadWidget(WIDGETS_DIRECTORY, widget.directoryName);

      if (widget instanceof Error && widget.message.startsWith("Couldn't find compiled widget file for")){

        transform(`${WIDGETS_DIRECTORY}/${widget.directoryName}/index.js`, `${WIDGETS_DIRECTORY}/${widget.directoryName}/compiled.js`, () => {
          const compiledWidget = loader.loadWidget(WIDGETS_DIRECTORY, widget.directoryName);

          this.initiateAndPushWidget(compiledWidget);
        });
      }
      else
        this.initiateAndPushWidget(widgetInstance);
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

      const widget = loader.loadWidget(WIDGETS_DIRECTORY, widgetName);
      
      if (widget instanceof Error)
        console.error("Couldn't instantiate widget: " + widgetName + "\n" + widget);
      else {

        this.initiate(widget);
        this.widgets.push(widget);

        console.log("Widget name " + widgetName + " was added successfully!");
        
        return widget;
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