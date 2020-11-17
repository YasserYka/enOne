// you can import libraries you need
const indeed_scraper = require('indeed-scraper');

// import our plugin library
const { colors, card } = require('personal-plugin');
// import our plugin engine
const plugin_engine = require('personal-engine');

// define your own code to get the data needed for your plugin
const scrape_indeed = () => {

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
    }).then(jobs => { create_plugin_card(jobs); });

};

// define your own function and use our API to construct a card for your plugin
const create_plugin_card = jobs => {

    // display an anchor in card's title
    card.title(card.anchor("https://opensource.indeedeng.io/api-documentation/", "Indeed API"));

    // display an image (so far only external images are supported)
    card.image("https://jobspic.jpg");

    // change the color of the card
    card.color(colors.DARK);

    // create a table from array of objects 
    card.table(jobs);

    // adds a paragraph to card's body
    card.body(card.paragraph("Indeed's jobs in the last 24H"));

    // adds a muted text to card's footer
    card.footer(card.mutedText("Creator: H3xo0"));

    // pass your external packages used and your card object into our plugin engine
    plugin_engine.packages(['indeed-scraper']).generate(card);

}