# In0ne

Extendable personal dashboard, with various of plugins to show you information interested-in in daily pases.  

![Maintenance](https://img.shields.io/maintenance/yes/2021)

# Development

To start writing your own plugin, run

```
$ npm setup
```

Then answer some simple questions to generate starter folder, it will create a folder with your plugin name and generate the following initial structure in it.

```
📂YourPluginName
├── 📜YourPluginName.js
├── 📜configuration.json
├── 📜README.md  
```

##### *YourPluginName.js*

```
module.exports = class YourPluginName {
  
  // called when the module is initialize
  async initialize() {

  }

  // return JSX code to generates dom to be displayed
  async render() {

    return (
        <div></div>
    );
  }

  // scripts to make plugin dynamic
  async script() {

  }
  
};
```

##### *configuration.json*

```
{
  "author": "YourName",
  "verion": "1.0"
}
```

##### *README.md*

```
# YourPluginName
Your plugin description

# Guide
How to configure
```
