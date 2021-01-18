const plugin = require('../plugin.js');
const engine = require('../engine.js');
const environment = require('../environment.js');

const got = require('got');

const getActivity = async () => {
    return await got('http://www.boredapi.com/api/activity').then(response => {
        
        return JSON.parse(response.body);
    }).catch(error => {

        throw Error(error);
    });
}

getActivity().then(response => {
    plugin.header(plugin.anchor('http://www.boredapi.com', 'Bored?'));

    plugin.body(plugin.bold(response['activity']));
    
    engine.engine(plugin, environment.TESTING);
});