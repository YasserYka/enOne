const got = require('got');

// minimal weekly installation count of packages for security reasons
const MIN_INSTALLATION_COUNT = 10000;

// checks if package is popular before installation
const isPopular = async package => {

    return got(`https://api.npmjs.org/downloads/point/last-month/${package}`).then(response => {
    
        return MIN_INSTALLATION_COUNT < JSON.parse(response.body).downloads;
    }).catch(error => {

        console.error(error);
        return false;
    });

}

// chick if package is already instaled in node_module
const isInstalled = code => {

    return false;
}

const install = package => {

}

module.exports = {
};
