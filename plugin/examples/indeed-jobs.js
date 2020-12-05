const plugin = require('../plugin');
const engine = require('../engine');

// display an anchor in card's title
plugin.header(plugin.anchor('https://opensource.indeedeng.io/api-documentation/', 'Indeed API'));

// small sized icon in card's header
plugin.header(plugin.fontawesome('briefcase', 1));

// create a table from an array of objects 
plugin.table(
    [
        {'Job title': 'Python Developer', 'Company': 'confidential', 'City': 'Van', 'WFH': 'NO'},
        {'Job title': 'UX/UI Designer', 'Company': 'confidential', 'City': 'Sokoto', 'WFH': 'YES'},
        {'Job title': 'Data Scientist', 'Company': 'confidential', 'City': 'Yonkers', 'WFH': 'NO'},
    ].map(job => plugin.tableItem(job))
);

plugin.footer(plugin.text("Jobs in last 24H"));

// pass your external packages used and your card object into our plugin engine
engine.engine(plugin);