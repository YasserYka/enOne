const plugin = require('../plugin.js');
const engine = require('../engine.js');
const environment = require('../environment.js');


// display a title in card's body
plugin.header(plugin.text('Note'));

// adds a list in card's body
plugin.input('Your thoughts?', plugin.localStorage('get', 'note'), () => {plugin.localStorage()});

// compile and launch the plugin
engine.engine(plugin, environment.TESTING);