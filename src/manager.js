const loader = require("./loader");
const { transform } = require("./compile");
const { persistUserdata } = require('./util');
const { exec } = require('child_process');
const { observeElement } = require('./observer');
const { addGridItem, removeGridItem } = require('./grid');
const { toast } = require('./notification');


const WIDGETS_DIRECTORY = __dirname + "/../enOne-widgets/widgets";

class Manager {

  setUserdata(userdata){

    this.userdata = userdata;
    this.loadingStatsWidgets = {};
  }

  loadAndInitiateWidgets(){

    this.userdata.widgets.forEach(widget => {

      // skip widget if disabled
      if (widget.disabled) {
        return;
      }

      // Initiate widget if dependencies are available
      if (widget.dependencyInstalled) {
        this.loadAndInitiateWidget(widget, () => {});
        return;
      }

      // Install dependencies of widget then initiate widget
      this.installWidgetDependencies(widget.directoryName, () => {

        widget.dependencyInstalled = true;
        this.loadAndInitiateWidget(widget, () => {});
      });

    });
  }

  installWidgetDependencies(widgetName, callback) {

    exec(`npm install --no-save ${WIDGETS_DIRECTORY}/${widgetName}`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }

      callback();
    });
  }

  loadAndInitiateWidget(widget, callback){
    let widgetInstance = loader.encapsulateWidget(widget.directoryName);

    if (!widgetInstance.isValid) {
      console.error(widgetInstance.error); 
      return;
    }

    if (!widgetInstance.isCompiled) {

      transform(widgetInstance.indexFilePath, widgetInstance.compiledFilePath, () => {

        const compiledWidgetInstance = loader.encapsulateWidget(widget.directoryName);

        this.initiate(compiledWidgetInstance, callback);
      });
    } 
    else {
      
      this.initiate(widgetInstance, callback);
    }

    persistUserdata(this.userdata);
  }

  initiate(widget, callback) {

    widget.instance.initialize(widget.config).then(() => {

      widget.instance.render().then(renderedWidget => {

        let wrappedElement = addGridItem(renderedWidget, widget.name);

        observeElement(wrappedElement);

        widget.instance.script().then(() => {

          callback();

          toast.success("Succefully added " + widget.name);
        });
      });
    });
  }

  // adds a widget at runtime
  add(widgetName, callback){

    const widget = this.userdata.widgets.find(widget => widgetName === widget.directoryName);

    if (widget && widget.disabled) {

      if (widget.dependencyInstalled) {
        this.loadAndInitiateWidget(widget, callback);

      } else {
        this.installWidgetDependencies(widget.directoryName, () => {

          widget.dependencyInstalled = true;
          this.loadAndInitiateWidget(widget, callback);
        });
      }
      widget.disabled = false;

      toast.warn("It might take longer time the first time you add a new widget");

      persistUserdata(this.userdata);
    }
  }

  // removes a widget at runtime
  remove(widgetName){

    const widget = this.userdata.widgets.find(widget => widgetName === widget.directoryName);

    if(widget && !widget.disabled){

      // TODO: setInterval might be still running find a workaround

      widget.disabled = true;
      removeGridItem(widgetName);

      toast.success(widgetName + " was removed successfully!");

      persistUserdata(this.userdata);
    }
  }

}

module.exports = new Manager();