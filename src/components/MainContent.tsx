
import { useCurrentCity } from '../Helpers/CurrentCityContext'
import { WeatherData } from './SearchItem'
import { customRound } from './Slider'
import { useState } from 'react'
import SearchHistory from './SearchHistory'
import Slider from './Slider'
import DataBox from './DataBox'

function getImageUrl(current:WeatherData['current'] | undefined){

    const urlsArray = current?.getWeatherType()?.split(",")

    switch(urlsArray?.length){
      case 3: 
        return urlsArray[2]
      case 4:
         return urlsArray[3] 
      case 5: 
        return current?.isDay ? urlsArray[3] : urlsArray[4]
    }
    
}

function getMinMaxTemp(data: WeatherData | undefined){
  const currentTime = data?.current.time.getDay()
  const index = data?.daily.time.findIndex((date) => date.getDay() === currentTime)
  const MinMaxArray = [data?.daily.temperature2mMin[index as number], data?.daily.temperature2mMax[index as number]]
  return MinMaxArray
}

function getVisibility(hourly : WeatherData['hourly']){
  const currentTime = new Date()

  const currentIndex = hourly.time.findIndex(time => {
      
    return (time.getHours() === currentTime.getHours()) && (currentTime.toLocaleDateString() === time.toLocaleDateString());
  });

  

    //change to km
  return String(hourly.visibility[currentIndex]).trim()

}

function getDewPoint(hourly : WeatherData['hourly']){
  const currentTime = new Date()

  const currentIndex = hourly.time.findIndex(time => {
      
    return (time.getHours() === currentTime.getHours()) && (currentTime.toLocaleDateString() === time.toLocaleDateString());
  });

  return customRound(hourly.dewPoint2m[currentIndex])
}

function getRainProb(hourly : WeatherData['hourly']){

  const currentTime = new Date()

  const currentIndex = hourly.time.findIndex(time => {
      
    return (time.getHours() === currentTime.getHours()) && (currentTime.toLocaleDateString() === time.toLocaleDateString());
  });

  return hourly.precipitationProbability[currentIndex]

}

export default function MainContent() {
const {currentCity:data, locationName} = useCurrentCity()
const [minTemp, maxTemp] = getMinMaxTemp(data)
const [hourly, setHourly] = useState(true)
const info = data as WeatherData


const sliderDataHourly = {
  data: {
    time: info.hourly.time,
    weatherCode: info.hourly.weatherCode,
    temperature2m: info.hourly.temperature2m ?? undefined,
    temperature2mMax: info.daily.temperature2mMax ?? undefined,
    getWeatherType: info.hourly.getWeatherType, 
}

 
}
const sliderDataDaily= {
  data: {
    time: info.daily.time,
    weatherCode: info.daily.weatherCode,
    temperature2m:info.hourly.temperature2m ?? undefined,
    temperature2mMax: info.daily.temperature2mMax ?? undefined,
    getWeatherType: info.daily.getWeatherType,
}

}

  return (

    <div>
      <section className='left-panel'>
        <img src={require("../assests/Icons/"+ getImageUrl(data?.current))} alt="" />
        <p>{customRound(data?.current.temperature2m as number) + " °C"}</p>
        <p>{locationName}</p>
        <p>{`H: ${customRound(maxTemp as number)} °C L: ${customRound(minTemp as number)} °C`}</p>
        <button onClick={()=>{setHourly(false)}}>Daily</button>
        <button onClick={()=> {setHourly(true)}}>Hourly</button>
        <Slider isHourly ={hourly} data={ hourly ?  sliderDataHourly.data : sliderDataDaily.data }></Slider>
      </section>

      <section className='right-panel'>
        <SearchHistory/>
        <DataBox title="Precipitaion" icon='sun.png' body={customRound(data?.current.precipitation as number) + ' mm in the last hour'} footer={ getRainProb(data?.hourly as WeatherData['hourly'])+"% chance to Rain"}  />
        <DataBox title='Humidity' icon='sun.png' body={data?.current.relativeHumidity2m + " °C"} footer={'The dew point is ' + getDewPoint(data?.hourly as WeatherData['hourly'])+" °C right now"}/>
        <DataBox title='Feels Like' icon='sun.png' body={customRound(data?.current.apparentTemperature as number)+" °C"} footer={data?.current.apparentTemperature as number >= (data?.current.temperature2m as number) ? "Humidity is making it feel hotter": "Wind is making it feel cooler" }/>
        <DataBox title='Visibility' icon='sun.png' body={getVisibility(data?.hourly as WeatherData['hourly']) + " Km"} footer='Perfectly Clear View'/>

      </section>
    </div>

  )
}
