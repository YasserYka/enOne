const plugin = require('../plugin.js');
const engine = require('../engine.js');
const environment = require('../environment.js');

const got = require('got');

const getAdvice = async () => {
    return await got('https://api.adviceslip.com/advice', { headers: {'Accept': 'application/json'} }).then(response => {
        
        return JSON.parse(response.body);
    }).catch(error => {

        throw Error(error);
    });
}

getAdvice().then(response => {

    const dateToday = new Date();
    let titles;

    if (dateToday.getHours() < 12)
        titles = {heading: `Good Morning, *Name`, line: 'hope you had good night sleep'};
    else if (dateToday.getHours() < 18)
        titles = {heading: `Good Afternoon, *Name`, line: 'how has been your day?'};
    else
        titles = {heading: `Have A Good Night, *Name`, line: 'big day tomorrow? no?'};

    plugin.title(titles['heading']);

    plugin.body(plugin.paragraph(titles['line']));

    plugin.body(plugin.paragraph('Today\'s advice'));

    plugin.body(plugin.text(`"${response['slip']['advice']}"`));

    engine.engine(plugin, environment.TESTING);
});