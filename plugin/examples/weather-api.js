const plugin = require('../plugin');
const engine = require('../engine');

// TODO: handle submitting packages
const got = require('got');

// call weather API
const getWeather = async () => {
    return await got('https://www.metaweather.com/api/location/44418/').then(response => {
        
        return JSON.parse(response.body);
    }).catch(error => {

        throw Error(error);
    });
}

getWeather().then(weatherdata => {
    weatherdata = weatherdata.consolidated_weather[0];

    // display a title in card's body
    plugin.header(plugin.text('Today\'s Weather'));
    
    // display image to describe the weather
    plugin.image(`https://www.metaweather.com/static/img/weather/png/${weatherdata.weather_state_abbr}.png`);

    // card's title
    plugin.title(weatherdata.weather_state_name);

    // paragraph to display temperature
    plugin.body(plugin.paragraph(`Temperature ${weatherdata.min_temp | 0}-${weatherdata.max_temp | 0}°C`));

    // paragraph to display humidity
    plugin.body(plugin.paragraph(`Humidity ${weatherdata.humidity | 0} %`));

    // paragraph to display wind speed
    plugin.body(plugin.paragraph(`Wind Speed ${weatherdata.wind_speed | 0} mi/h`));

    // paragraph to display temperature air pressure
    plugin.body(plugin.paragraph(`Air Pressure ${weatherdata.air_pressure | 0} inHg`));

    // URL of API document
    plugin.footer(plugin.anchor('https://www.metaweather.com/api/', 'Weather API'));
    
    // compile and launch the plugin
    engine.engine(plugin);
});