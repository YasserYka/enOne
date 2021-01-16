import plugin from '../plugin.js';
import engine from '../engine.js';
import environment from '../environment.js';

const currentHour = new Date().getHours();

// all soundcloud's embedded urls are a same except a playlist id 
const embeddedUrl = id => `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`

let playlist;

if (currentHour < 12)
    playlist = {title: 'Songs to Kickstart Your Day', url: embeddedUrl(272741983)};
else if (currentHour < 18)
    playlist = {title: 'Songs To Lighten The Mood', url: embeddedUrl(792881085)};
else
    playlist = {title: 'Late Night Vibes', url: embeddedUrl(1130704939)};

plugin.header(plugin.text(playlist.title), plugin.fontawesome('soundcloud', 1));

plugin.iframe(playlist.url);

// compile and launch the plugin
engine.engine(plugin, environment.TESTING);