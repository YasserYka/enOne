import plugin from '../plugin.js';
import engine from '../engine.js';
import environment from '../environment.js';

// display an image (so far only external images are supported)
plugin.image('https://pngimg.com/uploads/triangle/triangle_PNG30.png');

// display a title in card's body
plugin.title('Songs to lighten up your mood');

// adds a list in card's body
plugin.list(
    [
        {'URL': 'https://open.spotify.com/track/5C0fWU1j3pa4vvAZuYyisq', 'title': 'Hiccup (Valley)'},
        {'URL': 'https://open.spotify.com/track/5KCbr5ndeby4y4ggthdiAb', 'title': 'Wonder (Shawn Mendes)'},
        {'URL': 'https://open.spotify.com/track/5LL9lSNn26GBoC5StQ3itk', 'title': 'Kids Again (Sam Smith)'},
    ].map(song => plugin.listItem(plugin.anchor(song.URL, song.title)))
);

// adds an icon in card's footer
plugin.footer(plugin.fontawesome('spotify'));

// compile and launch the plugin
engine.engine(plugin, environment.TESTING);