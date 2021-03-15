const got = require("got");
const { writeFile, writeFileSync } = require("fs");
const { listLocal } = require("./loader");
const { execSync } = require('child_process');

// Fetch version number from master brach and compare it with current version
const checkIfLatestVersion = async currentVersion => {

    return await got('https://raw.githubusercontent.com/YasserYka/enOne/master/config.json?token=ALEO7DCB6VBDIZHCZTJA4TDAKHJMI').then(response => {

        if(response.statusCode == 200){

            // match "version": "1.0" pattern
            const match = response.body.match(/"version":\s*"(.*)"/);

            let remoteVersion;

            if(match)
                remoteVersion = match[1];
            else
                throw Error("Regex's version pattern can't find version in returned Githubusercontent's body");

            remoteVersion = parseFloat(remoteVersion);

            if (currentVersion < remoteVersion)
                console.log(colors.yellow("A new version is avaliable, your current version is " + currentVersion + " lates version is " + remoteVersion));
                
        }
        else
            console.error(colors.red(Error("Githubusercontent returned non-200 status code!")));
    }).catch(error => {

      console.error(colors.red(error));
    });
}

const generateDefaultUserdataFile = userdataPath => {

    const widgetNames = listLocal();

    writeFileSync(userdataPath, JSON.stringify({
        widgets: widgetNames.map(name => ({name: name, disabled: true})),
    }));
}

const excecuteCommand = (command, currentDirectory) => {

    try {
        let result = execSync(command, {cwd: currentDirectory});
        console.log(result.toString());

    } catch (err){ console.error(err); }
}

const cloneWidgetsSubmoduleRepository = () => {

    excecuteCommand('git submodule update --init --recursive', __dirname + "/../");
}

const pullWidgetsSubmoduleRepository = () => {

    excecuteCommand('git pull origin master', __dirname + "/../enOne-widgets");
}

cloneWidgetsSubmoduleRepository()

const ANSI_CODES = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    white: "\x1b[37m"
};

const colors = {
    red: (message) => (ANSI_CODES.red + message + ANSI_CODES.reset),
    green: (message) => (ANSI_CODES.green + message + ANSI_CODES.reset),
    yellow: (message) => (ANSI_CODES.yellow + message + ANSI_CODES.reset),
    blue: (message) => (ANSI_CODES.blue + message + ANSI_CODES.reset),
    white: (message) => (ANSI_CODES.white + message + ANSI_CODES.reset)
}

module.exports = {
    color: colors,
    checkLatestVersion: checkIfLatestVersion,
    generateDefaultUserdataFile: generateDefaultUserdataFile,
    pullWidgetsSubmoduleRepository: pullWidgetsSubmoduleRepository
}
