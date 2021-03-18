const loader = require("./loader");
const { transform } = require("./compile");
const FileNotFound = require("./errors/FileNotFound");
const WidgetNotCompiled = require("./errors/WidgetNotCompiled");
const { persistUserdata } = require('./util');
const { exec } = require('child_process');

const WIDGETS_DIRECTORY = __dirname + "/../enOne-widgets/widgets";

class Manager {

  setUserdata(userdata){ 

    this.userdata = userdata;
  }

  loadAndInitiateWidgets(){

    this.userdata.widgets.forEach(widget => {
    
      if (widget.disabled) return; // skip widget

      if (widget.dependeicesInstalled)
        this.loadAndInitiateWidget(widget);
      else
        this.installWidgetDependencies(widget.directoryName, () => {

          widget.dependeicesInstalled = true;
          this.loadAndInitiateWidget(widget);
          persistUserdata(this.userdata);
        });

    });
  }

  installWidgetDependencies(widgetName, callback) {

    exec(`npm install --no-save ${WIDGETS_DIRECTORY}/${widgetName}`, (err, stdout, stderr) => {
      if (err)
        console.error(err);
      else
        callback();
    });
  }

  loadAndInitiateWidget(widget){
    const widgetInstance = loader.loadWidget(WIDGETS_DIRECTORY, widget.directoryName);

    if (widgetInstance instanceof FileNotFound)
      console.error(widgetInstance);
    else if(widgetInstance instanceof WidgetNotCompiled){

      const widgetDirectory = `${WIDGETS_DIRECTORY}/${widget.directoryName}`; 
      
      transform(widgetDirectory + '/index.js', widgetDirectory + '/compiled.js', () => {

        const compiledWidget = loader.loadWidget(WIDGETS_DIRECTORY, widget.directoryName);
        
        this.initiate(compiledWidget);
      });
    }
    else
      this.initiate(widgetInstance); 
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

    const widget = this.userdata.widgets.find(widget => widgetName === widget.directoryName);

    if (widget && widget.disabled){

      if (widget.dependeicesInstalled)
        this.loadAndInitiateWidget(widget);
      else
        this.installWidgetDependencies(widget.directoryName, () => {

          widget.dependeicesInstalled = true;
          this.loadAndInitiateWidget(widget);
        });

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

};

module.exports = new Manager();