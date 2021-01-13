import plugin from '../plugin.js';
import engine from '../engine.js';
import environment from '../environment.js';

import got from 'got';

const getJoke = async () => {
    return await got('https://icanhazdadjoke.com/', { headers: {'Accept': 'application/json'} }).then(response => {
        
        return JSON.parse(response.body);
    }).catch(error => {

        throw Error(error);
    });
}

getJoke().then(response => {
    plugin.header(plugin.text('Dad\'s jokes'));

    plugin.body(plugin.bold(response['joke']));
    
    plugin.footer(plugin.anchor('https://icanhazdadjoke.com/api', 'Icanhazdadjoke API'));

    engine.engine(plugin, environment.TESTING);
});