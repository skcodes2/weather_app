import React from 'react'
import { useCurrentCity } from '../Helpers/CurrentCityContext'
import { getWeatherData } from '../Helpers/DataFetching'
import { getCoordinates } from '../Helpers/DataFetching'




export default function SearchHistory() {
    const {setSearchInput,setCurrentCity, searchHistory} = useCurrentCity()

    function getData(city:string, state:string, country:string){
    
        const coords = getCoordinates(city, country, state)
            getWeatherData(coords.lat, coords.long).then(data => {
                 setCurrentCity(data)
                 setSearchInput(`${city}, ${state} ${country}`)
            }).catch(error => { console.log(error) })
    }

  return (
    <div>
        {searchHistory.map((item)=> {
            const city = item.split(",")[0].trim()
            const state = item.split(",")[1].slice(0, -2).trim()
            const country = item.split(",")[1].slice(-2).trim()

            return(
                <p onClick={()=>{getData(city, state, country)}}>{item.split(",")[0].trim()}</p>
            )
            
})}
    </div>
  )
}
