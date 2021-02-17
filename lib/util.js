
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
