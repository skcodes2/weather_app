import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import { CurrentCityContext } from './Helpers/CurrentCityContext';
import MainContent from './components/MainContent';
import { getWeatherData } from './Helpers/DataFetching';
import { WeatherData } from './components/SearchItem';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  const [currentCity, setCurrentCity] = useState<WeatherData | undefined>(undefined);
  const [searchInput, setSearchInput] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>(["London, Ontario CA", "Toronto, Ontario CA", "Vancouver, British Columbia CA"])
  const [locationName, setLocationName] = useState("")
  const[backgroundURL, setBackgroundURL] = useState('')
  
  const defualtCoords = [42.9849, -81.249725] //set to London lat and long
  const defualtName = "London, Ontario CA"
  let root = document.getElementById('root') as HTMLElement

  function addToHistory(item:string){
      setSearchHistory((prev)=>([item,prev[0], prev[1]]))
  }

  function determineURL(array: string[], isDay:number){

    switch(array.length){
      case 3: return array[1]
      case 4: return isDay ? array[1] : array[2]
      case 5: return isDay ? array[1] : array[2]
    }
  }

  
  function createBackgroundURl(){
    let host = "http://localhost:3000"
    let stringOfUrls = currentCity?.current.getWeatherType() as string
    const arrayUrls = stringOfUrls.split(",")
    const url = determineURL(arrayUrls, currentCity?.current.isDay as number)
    const newURl = require("../src/assests/backgrounds/"+url)
    const imagepath = host+newURl
    root.style.backgroundImage = `url(${imagepath})`
    setBackgroundURL(imagepath)
  }

  useEffect(()=>{
    if(currentCity){
      createBackgroundURl()
    }
  },[currentCity])

  useEffect(()=>{
    //london coordinates
    getWeatherData(defualtCoords[0], defualtCoords[1]).then((data)=>{
      setCurrentCity(data)
      setLocationName(defualtName)
    })
    
  },[])

  return (
    <div className="weather-app-container">
      
      
      <CurrentCityContext.Provider value={{ currentCity, setCurrentCity, searchInput, setSearchInput, searchHistory, addToHistory, setLocationName, locationName }}>

        <SearchBar />
        {currentCity && <MainContent/>}
      </CurrentCityContext.Provider>
    </div>
  );
}

export default App;
