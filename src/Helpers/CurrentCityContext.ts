import { createContext, useContext } from "react"
import { WeatherData } from "../components/SearchItem"


export type CurrentCityContextType = {
    currentCity: WeatherData| undefined,
    setCurrentCity: (c: WeatherData | undefined) => void
    searchInput: string
    setSearchInput: (input: string)=> void,
    searchHistory: string[],
    addToHistory: (item:string) =>void,
    setLocationName: (name: string) => void,
    locationName: string,
    
     
}

export const CurrentCityContext = createContext<CurrentCityContextType>({
    currentCity: undefined,
    setCurrentCity: () => {},
    searchInput:'',
    setSearchInput: ()=>{},
    searchHistory: ["London, Ontario CA", "Toronto, Ontario CA", "Vancouver, British Columbia CA"],
    addToHistory: ()=>{},
    setLocationName: () => {},
    locationName: "",
})

export const useCurrentCity = () => useContext(CurrentCityContext)
