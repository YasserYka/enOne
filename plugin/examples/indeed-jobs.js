const plugin = require('../plugin.js');
const engine = require('../engine.js');
const environment = require('../environment.js');

// display an anchor in card's title
plugin.header(plugin.text('Today\'s jobs'));

// create a table from an array of objects 
plugin.table(
    [
        {'Job title': 'Python Developer', 'Company': 'confidential', 'City': 'Van', 'WFH': 'NO'},
        {'Job title': 'UX/UI Designer', 'Company': 'confidential', 'City': 'Sokoto', 'WFH': 'YES'},
        {'Job title': 'Data Scientist', 'Company': 'confidential', 'City': 'Yonkers', 'WFH': 'NO'},
    ].map(job => plugin.tableItem(job))
);

plugin.footer(plugin.anchor('https://opensource.indeedeng.io/api-documentation/', 'Indeed API'));

// small sized icon in card's header
plugin.footer(plugin.fontawesome('briefcase', 1));

// pass your external packages used and your card object into our plugin engine
engine.engine(plugin, environment.TESTING);
