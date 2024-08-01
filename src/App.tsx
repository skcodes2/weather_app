import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [WeatherData, setWeatherData] = useState()

  return (
    <div className="weather-app-container">
      <SearchBar />
    </div>
  );
}

export default App;



