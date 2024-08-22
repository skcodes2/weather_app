
import { getWeatherData } from '../Helpers/DataFetching'
import { getCoordinates } from '../Helpers/DataFetching'
import { useCurrentCity } from '../Helpers/CurrentCityContext'



type SearchProps = {
    city: string,
    country: string,
    state: string
}

export type WeatherData = {
    current: {
        apparentTemperature: number;
        cloudCover: number;
        getWeatherType: () => string| undefined;
        isDay: number;
        precipitation: number;
        pressureMsl: number;
        rain: number;
        relativeHumidity2m: number;
        showers: number;
        snowfall: number;
        temperature2m: number;
        time: Date;
        weatherCode: number;
        windDirection10m: number;
        windSpeed10m: number;
    };
    daily: {
        apparentTemperatureMax: Float32Array;
        apparentTemperatureMin: Float32Array;
        daylightDuration: Float32Array;
        getWeatherType: (code: number) => string | undefined;
        precipitationHours: Float32Array;
        precipitationProbabilityMax: Float32Array;
        precipitationSum: Float32Array;
        rainSum: Float32Array;
        showersSum: Float32Array;
        snowfallSum: Float32Array;
        sunrise: Float32Array;
        sunset: Float32Array;
        sunshineDuration: Float32Array;
        temperature2mMax: Float32Array;
        temperature2mMin: Float32Array;
        time: Date[];
        uvIndexMax: Float32Array;
        weatherCode: Float32Array;
        windDirection10mDominant: Float32Array;
        windSpeed10mMax: Float32Array;
    };
    hourly: {
        cloudCover: Float32Array;
        getWeatherType: (code: number) => string| undefined;
        precipitation: Float32Array;
        precipitationProbability: Float32Array;
        pressureMsl: Float32Array;
        rain: Float32Array;
        relativeHumidity2m: Float32Array;
        showers: Float32Array;
        snowfall: Float32Array;
        temperature2m: Float32Array;
        time: Date[];
        weatherCode: Float32Array;
        visibility: Float32Array;
        windSpeed10m: Float32Array;
        windDirection10m: Float32Array;
        dewPoint2m: Float32Array;
    };
};




export default function SearchItem({ city, country, state }: SearchProps) {
    const {setCurrentCity, addToHistory} = useCurrentCity()
    const {setSearchInput,setLocationName} = useCurrentCity()

    function displayWeather({ city, country, state }: SearchProps ) {

        const coords = getCoordinates(city, country, state)
        getWeatherData(coords.lat, coords.long).then(data => {
             setSearchInput("")//clear search bar when item clicked 
             setLocationName(`${city}, ${state} ${country}`)
             addToHistory(`${city}, ${state} ${country}`)   //update history
             setCurrentCity(data)
             
        }).catch(error => { console.log(error) })
    }

    return (
        <div className='item' onClick={() => { displayWeather({ city, country, state }) }}>
            <i className="fas fa-search" style={{
                    left: '10px',
                    fontSize: '2rem',
                    top: '51%',
                    color: 'white',
                    zIndex: '100'
                }}>

                </i>
            <p>{city + ", " + state + " " + country}</p>
        </div>
    )
}
