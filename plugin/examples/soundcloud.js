import plugin from '../plugin.js';
import engine from '../engine.js';
import environment from '../environment.js';

const currentHour = new Date().getHours;

let playlist;

if (currentHour < 12)
    playlist = {title: 'Songs to Kickstart Your Day', url:  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/808531317&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'};
else if (currentHour < 18)
    playlist = {title: 'Songs To Lighten The Mood', url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/792881085&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'};
else
    playlist = {title: 'Late Night Vibes', url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/272741983&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'};

plugin.header(plugin.text(playlist.title), plugin.fontawesome('soundcloud', 1));

plugin.iframe(playlist.url);

// compile and launch the plugin
engine.engine(plugin, environment.TESTING);