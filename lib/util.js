
const got = require("got");

// Fetch version number from master brach and compare it with current version
const checkIfLatestVersion = currentVersion => {

    got('https://raw.githubusercontent.com/YasserYka/enOne/master/config.json?token=ALEO7DGKQ5QIJIJDZPWSXYLAGVSVU').then(response => {
    
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
            throw Error("Githubusercontent returned non-200 status code!");
    }).catch(error => {

      console.error(colors.red(error));
    });
}

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
    checkLatestUpdate: checkIfLatestVersion
}
