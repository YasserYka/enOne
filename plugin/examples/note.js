import plugin from '../plugin.js';
import engine from '../engine.js';
import environment from '../environment.js';


// display a title in card's body
plugin.header(plugin.text('Note'));

// adds a list in card's body
plugin.input('Your thoughts?', plugin.localStorage('get', 'note'), () => {plugin.localStorage()});

// compile and launch the plugin
engine.engine(plugin, environment.TESTING);