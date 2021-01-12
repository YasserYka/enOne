import plugin from '../plugin.js';
import engine from '../engine.js';
import environment from '../environment.js';

import got from 'got';

// get list of top stories id
const getStoriesId = async () => {
    return await got('https://hacker-news.firebaseio.com/v0/beststories.json?orderBy="$key"&limitToFirst=6').then(response => {
        
        return JSON.parse(response.body);
    }).catch(error => {

        throw Error(error);
    });
}

const getStory = async id => {
    return await got(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => {
        
        return JSON.parse(response.body);
    }).catch(error => {

        throw Error(error);
    });
}

getStoriesId().then(ids => {

    Promise.all(ids.map(id => getStory(id))).then(stories => {
        plugin.header(plugin.text('Today\'s hottest stories!'));

        plugin.list(stories.map(story => plugin.listItem(plugin.anchor(story.url, story.title))));
        
        plugin.footer(plugin.anchor('https://news.ycombinator.com', 'Hacker News'));

        plugin.footer(plugin.fontawesome('hacker-news', 2));

        engine.engine(plugin, environment.TESTING);
    });

});