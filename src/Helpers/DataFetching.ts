

import { stat } from 'fs';
import { fetchWeatherApi } from 'openmeteo';
const cities = require('../assests/cities.json');


export const weatherCodeMap = new Map([
    [0, "Clear sky,clear_day.png,clear_night.png,sun.png,moon.png"],
    [1, "Mainly clear,clear_day.png,clear_night.png,sun.png,moon.png"],
    [2, "Mainly clear,clear_day.png,clear_night.png,sun.png,moon.png"],
    [3, "Cloudy,cloudy_day.png,cloudy_night.png,cloudy.png"],
    [45, "Foggy,foggy.png,cloudy.png"],
    [48, "Foggy,foggy.png,cloudy.png"],
    [51, "Light Drizzle,rain_Any.png,rain.png"],
    [53, "Moderate Drizzle,rain_Any.png,rain.png"],
    [55, "Dense Drizzle,rain_Any.png,rain.png"],
    [56, "Freezing Drizzle,rain_Any.png,rain.png"],
    [57, "Freezing Drizzle,rain_Any.png,rain.png"],
    [61, "Rainy,rain_Any.png,rain.png"],
    [63, "Rainy,rain_Any.png,rain.png"],
    [65, "Heavy Rain,rain_Any.png,rain.png"],
    [66, "Freezing Rain,rain_Any.png,rain.png"],
    [67, "Freezing Rain,rain_Any.png,rain.png"],
    [71, "Snow fall,snow_Any.png,snowfall.png"],
    [73, "Snow fall,snow_Any.png,snowfall.png"],
    [75, "Heavy Snow fall,snow_Any.png,snowfall.png"],
    [77, "Snow grains,snow_Any.png,snowfall.png"],
    [80, "Rain showers,rain_Any.png,rain.png"],
    [81, "Rain showers,rain_Any.png,rain.png"],
    [82, "Heavy Rain,rain_Any.png,rain.png"],
    [85, "Snow showers,snow_Any.png,snowfall.png"],
    [86, "Heavy Snow showers,snow_Any.png,snowfall.png"],
    [95, "Thunderstorm,thunderStorm_Any.png,storm.png"],
    [96, "Thunderstorm with slight hail,thunderStorm_Any.png,storm.png"],
    [99, "Thunderstorm with heavy hail,thunderStorm_Any.png,storm.png"]
]);

type Location = {
    name: string;
    lat: string;
    lng: string;
    country: string;
    admin1: string;
    admin2: string;
    state: string;
}


type CitiesProp = Location[];

type Coords = {
    lat: number;
    long: number;
}


export function getCoordinates(loco: string, country: string, state: string): Coords {
    let [city]: CitiesProp = cities.filter((city: Location) => (city.name.toLowerCase() === loco.toLowerCase()) && (city.country.toLowerCase() === country.toLowerCase()) && state === city.state);

    return {
        lat: parseFloat(city.lat),
        long: parseFloat(city.lng)
    }
}

export async function getWeatherData(lat: Number, long: Number) {

    const params = {
        "latitude": lat,
        "longitude": long,
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover", "pressure_msl", "wind_speed_10m", "wind_direction_10m"],
        "hourly": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "weather_code", "pressure_msl", "cloud_cover", "visibility", "wind_speed_10m", "wind_direction_10m"],
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_max", "precipitation_sum", "rain_sum", "showers_sum", "snowfall_sum", "precipitation_hours", "precipitation_probability_max", "wind_speed_10m_max", "wind_direction_10m_dominant"]
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();


    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {

        current: {
            getWeatherType: function () {
                return weatherCodeMap.get(current.variables(8)!.value())
            },
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            relativeHumidity2m: current.variables(1)!.value(),
            apparentTemperature: current.variables(2)!.value(),
            isDay: current.variables(3)!.value(),
            precipitation: current.variables(4)!.value(),
            rain: current.variables(5)!.value(),
            showers: current.variables(6)!.value(),
            snowfall: current.variables(7)!.value(),
            weatherCode: current.variables(8)!.value(),
            cloudCover: current.variables(9)!.value(),
            pressureMsl: current.variables(10)!.value(),
            windSpeed10m: current.variables(11)!.value(),
            windDirection10m: current.variables(12)!.value(),
        },
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            getWeatherType: function (code: number) {
                return weatherCodeMap.get(code)
            },
            temperature2m: hourly.variables(0)!.valuesArray()!,
            relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
            precipitationProbability: hourly.variables(2)!.valuesArray()!,
            precipitation: hourly.variables(3)!.valuesArray()!,
            rain: hourly.variables(4)!.valuesArray()!,
            showers: hourly.variables(5)!.valuesArray()!,
            snowfall: hourly.variables(6)!.valuesArray()!,
            weatherCode: hourly.variables(7)!.valuesArray()!,
            pressureMsl: hourly.variables(8)!.valuesArray()!,
            cloudCover: hourly.variables(9)!.valuesArray()!,
            visibility: hourly.variables(10)!.valuesArray()!,
            windSpeed10m: hourly.variables(11)!.valuesArray()!,
            windDirection10m: hourly.variables(12)!.valuesArray()!,
        },
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            getWeatherType: function (code: number) {
                return weatherCodeMap.get(code)
            },
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
            temperature2mMin: daily.variables(2)!.valuesArray()!,
            apparentTemperatureMax: daily.variables(3)!.valuesArray()!,
            apparentTemperatureMin: daily.variables(4)!.valuesArray()!,
            sunrise: daily.variables(5)!.valuesArray()!,
            sunset: daily.variables(6)!.valuesArray()!,
            daylightDuration: daily.variables(7)!.valuesArray()!,
            sunshineDuration: daily.variables(8)!.valuesArray()!,
            uvIndexMax: daily.variables(9)!.valuesArray()!,
            precipitationSum: daily.variables(10)!.valuesArray()!,
            rainSum: daily.variables(11)!.valuesArray()!,
            showersSum: daily.variables(12)!.valuesArray()!,
            snowfallSum: daily.variables(13)!.valuesArray()!,
            precipitationHours: daily.variables(14)!.valuesArray()!,
            precipitationProbabilityMax: daily.variables(15)!.valuesArray()!,
            windSpeed10mMax: daily.variables(16)!.valuesArray()!,
            windDirection10mDominant: daily.variables(17)!.valuesArray()!,
        },

    };

    return weatherData
}

