const plugin = require('../plugin/plugin');
const engine = require('../plugin/engine');
const color = require('../plugin/stylie/cardcolor');

plugin.background(color.COLOR.DARK);

plugin.image('https://pngimg.com/uploads/triangle/triangle_PNG30.png');

plugin.title('Music For Your Morning');

plugin.list(
    plugin.listItem(plugin.anchor("https://open.spotify.com/track/5C0fWU1j3pa4vvAZuYyisq", "Hiccup (Valley)")),
    plugin.listItem(plugin.anchor("https://open.spotify.com/track/5KCbr5ndeby4y4ggthdiAb", "Wonder (Shawn Mendes)")),
    plugin.listItem(plugin.anchor("https://open.spotify.com/track/5LL9lSNn26GBoC5StQ3itk", "Kids Again (Sam Smith)"))
);

plugin.footer(plugin.fontawesome('spotify'));

engine.engine(plugin);