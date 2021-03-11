const { existsSync } = require('fs');
const { color, generateDefaultUserdataFile, checkLatestVersion } = require(__dirname + '/../lib/util');
const remote = require('electron').remote
const  manager = require(__dirname + '/../lib/manager');

const ROOT_DIRECTORY = __dirname + "/..";
const CONFIG_PATH = ROOT_DIRECTORY + "/config.json";

if (!existsSync(CONFIG_PATH)){
    
    console.error(color.red("Can't find config file at " + CONFIG_PATH));
    remote.getCurrentWindow().close();
}

const configuration = require(CONFIG_PATH);

const USERDATA_PATH = ROOT_DIRECTORY + configuration.userdata;

if (!existsSync(USERDATA_PATH))
    generateDefaultUserdataFile();

checkLatestVersion(require(ROOT_DIRECTORY + "package.json").version);

manager.loadAll();

