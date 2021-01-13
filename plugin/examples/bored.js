import plugin from '../plugin.js';
import engine from '../engine.js';
import environment from '../environment.js';

import got from 'got';

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