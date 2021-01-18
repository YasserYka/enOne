// you can import libraries you need
const indeed_scraper = require('indeed-scraper');

indeed_scraper.query({
    host: 'www.indeed.com',
    query: 'Software',
    city: 'Seattle, WA',
    radius: '25',
    level: 'entry_level',
    jobType: 'fulltime',
    maxAge: '7',
    sort: 'date',
    limit: 100
}).then(jobs => { 
    /*// display an anchor in card's title
    plugin.header(plugin.anchor('https://opensource.indeedeng.io/api-documentation/', 'Indeed Scraper'));

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
    engine.engine(plugin);*/
    console.log(jobs)
 });
