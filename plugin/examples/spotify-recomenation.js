const plugin = require('../plugin');
const engine = require('../engine');

// change the color of the card
plugin.background(plugin.color.DARK);

// display an image (so far only external images are supported)
plugin.image('https://pngimg.com/uploads/triangle/triangle_PNG30.png');

// display a title in card's body
plugin.title('Music For Your Morning');

// adds a list in card's body
plugin.list(
    plugin.listItem(plugin.anchor("https://open.spotify.com/track/5C0fWU1j3pa4vvAZuYyisq", "Hiccup (Valley)")),
    plugin.listItem(plugin.anchor("https://open.spotify.com/track/5KCbr5ndeby4y4ggthdiAb", "Wonder (Shawn Mendes)")),
    plugin.listItem(plugin.anchor("https://open.spotify.com/track/5LL9lSNn26GBoC5StQ3itk", "Kids Again (Sam Smith)"))
);

// adds an icon in card's footer
plugin.footer(plugin.fontawesome('spotify'));

// compile and launch the plugin
engine.engine(plugin);