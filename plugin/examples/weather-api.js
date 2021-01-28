const got = window.require('got');

/*
When creating class name or id to use them in script element please do it in this way
for example from <h5 id="id"> to <h5 id={YouClassName.name + id}>
to make this as unique as possible and avoid having duplicate id with other plugins
and to make it easier to debug.

*/

module.exports = class WeatherAPI {

    // called when plugin is initiated
    init(){

        this.weather = {
            temperature: null,
            image: null,
            description: null,
        } // defien default values

        this.interval = 43200000; // 12 hours in milliseconds

        this.weather = getWeatherData();
    }

    // update plugin in interval
    interval(){

        setInterval(update(), this.weather.interval);
    }

    // updates indiviual elements
    update(){
        this.weather = this.getWeatherData();

        document.getElementById('description').innerHTML = `In London ${this.weather.description}`;
        document.getElementById('description').innerHTML = `Temperature ${this.weather.temperature}°C`;
        document.getElementById('description').src = this.weather.image;
    }

    // define your own function to fetch desired data
    getWeatherData(){

        return got('https://www.metaweather.com/api/location/44418/').then(response => {
            const weatherData = response.body;

            return {
                temperature: `${weatherData.min_temp | 0}-${weatherData.max_temp | 0}`,
                description: weatherData.weather_state_name,
                imageUrl: `https://www.metaweather.com/static/img/weather/png/${weatherData.weather_state_abbr}.png`
            };

        }).catch(error => {

            throw Error(error);
        });
    } 

    // return JSX code to generates dom to be displayed.
    render(){

        return ( 
            <div  class="grid-stack-item" gs-w="2" gs-h="6">
                <div class="card grid-stack-item-content mt-2 shadow bg-dark text-center">
                    <div class="card-header">
                        Today's Weather
                    </div>

                    <img src={this.data.image} class="card-img-top" alt="Card-Image.js" />

                    <div class="card-body">
                        <h5 id="description" class="undefined">
                            In London {this.weather.description}
                        </h5>

                        <b id="temperature">Temperature {this.weather.temperature}°C</b>
                    </div>

                    <div class="card-footer text-white">  
                        <a target="_blank" href="https://www.metaweather.com/api/" class="text-white card-link">
                            Weather API
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // script to be called inside <script> element
    script(){}
}