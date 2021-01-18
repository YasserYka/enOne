const plugin = require('../plugin.js');
const engine = require('../engine.js');
const environment = require('../environment.js');

const got = require('got');

const getAnimes = async () => {
    return await got('https://api.jikan.moe/v3/anime/1/recommendations', { headers: {'Accept': 'application/json'} }).then(response => {
        
        return JSON.parse(response.body);
    }).catch(error => {

        throw Error(error);
    });
}

getAnimes().then(animes => {

    animes = animes['recommendations'].slice(0, 9); 

    plugin.header(plugin.anchor('https://jikan.docs.apiary.io', 'Daily anime recommendation'));

    plugin.list(animes.map(anime => plugin.listItem(plugin.anchor(anime['url'], anime['title']))));

    engine.engine(plugin, environment.TESTING);
});