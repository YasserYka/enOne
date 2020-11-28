const got = require('got');
const npm = require('npm');


// minimal weekly installation count of packages for security reasons
const MIN_INSTALLATION_COUNT = 10000;

// checks if package is popular before installation
const isPopular = async package => {

    return await got(`https://api.npmjs.org/downloads/point/last-month/${package}`).then(response => {
    
        return MIN_INSTALLATION_COUNT < JSON.parse(response.body).downloads;
    }).catch(error => {

        console.error(error);
        return false;
    });
}

// chick if package is already instaled in node_module
const isInstalled = package => {
  try { require.resolve(package); return true; } catch(e) { return false; }
}

// install npm package by name
const install = packages => {
    npm.load((err)  => {
      if (err) console.error(er);

      npm.commands.install(packages, (er, data) => { if (er) console.error(er); });

    });
}

module.exports = {
};
