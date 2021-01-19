// you can import libraries you need
const indeed_scraper = require('indeed-scraper');
const plugin = require('../plugin.js');
const engine = require('../engine.js');
const environment = require('../environment.js');

indeed_scraper.query({
    host: 'www.indeed.com',
    query: 'Software',
    city: 'Seattle, WA',
    radius: '25',
    level: 'entry_level',
    jobType: 'fulltime',
    maxAge: '7',
    sort: 'date',
    limit: 8
}).then(jobs => { 
    // display an anchor in card's title
    plugin.header(plugin.anchor('https://opensource.indeedeng.io/api-documentation/', 'Indeed Scraper'));

    jobs = jobs.map(job => (({title, company, postDate}) => ({title, company, postDate}))(job));

    // create a table from an array of objects 
    plugin.table(
        jobs.map(job => plugin.tableItem(job))
    );

    plugin.footer(plugin.text("Jobs in last 24H"));

    // pass your external packages used and your card object into our plugin engine
    engine.engine(plugin);
 });
