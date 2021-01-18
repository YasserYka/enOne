const plugin = require('../plugin.js');
const engine = require('../engine.js');
const environment = require('../environment.js');

// TODO: handle submitting packages
const got = require('got');

const request = async url => {
 
    return await got(url).then(response => {
        
        return JSON.parse(response.body);
    }).catch(error => {

        throw Error(error);
    });
}

// call weather API
const getWeather = async woeid => {

    return request(`https://www.metaweather.com/api/location/${woeid}/`);
}

// get city via IP
const getCity = async () => {
    
    return request('https://freegeoip.app/json/');
}

// metaweather's API require woeid to get weather info
const getWoeid = async city => {

    return request(`https://www.metaweather.com/api/location/search/?query=${city}`);
}

getCity().then(city => {

    getWoeid(city.city).then(woeid => {

        getWeather(woeid[0].woeid).then(weatherdata => {

            weatherdata = weatherdata.consolidated_weather[0];
        
            // display a title in card's body
            plugin.header(plugin.text('Today\'s Weather'));
            
            // display image to describe the weather
            plugin.image(`https://www.metaweather.com/static/img/weather/png/${weatherdata.weather_state_abbr}.png`);
        
            // card's title
            plugin.title(`In ${city.city} The Weather Is ${weatherdata.weather_state_name}`);
        
            // paragraph to display temperature
            plugin.body(plugin.bold(`Temperature ${weatherdata.min_temp | 0}-${weatherdata.max_temp | 0}°C`));
        
            // URL of API document
            plugin.footer(plugin.anchor('https://www.metaweather.com/api/', 'Weather API'));
            
            // compile and launch the plugin
            engine.engine(plugin, environment.TESTING);
        });

    });

});