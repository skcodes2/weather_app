import React, { Dispatch, SetStateAction } from 'react'
import { getWeatherData } from '../Helpers/DataFetching'
import { getCoordinates } from '../Helpers/DataFetching'

type SearchProps = {
    city: string,
    country: string,
    state: string
}

type WeatherData = {
    current: {};
    daily: {};
    hourly: {};
}

function displayWeather({ city, country, state }: SearchProps) {

    const coords = getCoordinates(city, country, state)
    getWeatherData(coords.lat, coords.long).then(data => {

    }).catch(error => { console.log(error) })
}

export default function SearchItem(setWeatherData: Dispatch<SetStateAction<WeatherData>>, { city, country, state }: SearchProps) {
    return (
        <div onClick={() => { displayWeather({ city, country, state }) }}>
            <p>{city + ", " + state + " " + country}</p>
        </div>
    )
}
