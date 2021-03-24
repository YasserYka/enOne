const loader = require("./loader");
const { transform } = require("./compile");
const { persistUserdata } = require('./util');
const { exec } = require('child_process');
const { observeElement } = require('./observer');
const { addGridItem, removeGridItem } = require('./grid');

const WIDGETS_DIRECTORY = __dirname + "/../enOne-widgets/widgets";

class Manager {

  setUserdata(userdata){

    this.userdata = userdata;
  }

  loadAndInitiateWidgets(){

    this.userdata.widgets.forEach(widget => {

      // skip widget if disabled
      if (widget.disabled) {
        return;
      }

      // Initiate widget if dependencies are available
      if (widget.dependencyInstalled) {
        this.loadAndInitiateWidget(widget);
        return;
      }

      // Initiate the widget
      this.installWidgetDependencies(widget.directoryName, () => {

        widget.dependencyInstalled = true;
        this.loadAndInitiateWidget(widget);
        persistUserdata(this.userdata);
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

  loadAndInitiateWidget(widget){
    let widgetInstance = loader.encapsulateWidget(widget.directoryName);

    if (!widgetInstance.IsValid) {
      console.error(widgetInstance.Error); 
      return;
    }

    if (!widgetInstance.IsCompiled) {

      transform(widgetInstance.indexFile, widgetInstance.compiledFilePath, () => {

        const compiledWidget = loader.encapsulateWidget(widgetInstance.name);

        this.initiate(compiledWidget);
      });
    } 
    else {
      
      this.initiate(widgetInstance);
    }
  }

  initiate(widget) {

    widget.Instance.initialize(widget.Config).then(() => {

      widget.Instance.render().then((renderedWidget) => {

        let wrappedElement = addGridItem(renderedWidget, widget.name);

        observeElement(wrappedElement);

        widget.Instance.script().then(() => {

          console.log("Finished executing " + widget.Instance.constructor.name);
        });
      });
    });
  }

  // adds a widget at runtime
  add(widgetName){

    const widget = this.userdata.widgets.find(widget => widgetName === widget.directoryName);

    if (widget && widget.disabled) {

      if (widget.dependencyInstalled) {
        this.loadAndInitiateWidget(widget);
      } else {
        this.installWidgetDependencies(widget.directoryName, () => {

          widget.dependencyInstalled = true;
          this.loadAndInitiateWidget(widget);
        });
      }
      widget.disabled = false;

      console.log("Widget name " + widgetName + " was added successfully!");

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

      console.log("Widget name " + widgetName + " was removed successfully!");

      persistUserdata(this.userdata);
    }
  }

}

module.exports = new Manager();