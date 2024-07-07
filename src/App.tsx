import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getWeatherData } from './Helpers/DataFetching';
import cities from 'cities.json';
import { getCoordinates } from './Helpers/DataFetching';
function App() {

  getWeatherData(50.1, 20.1).then(data => {

    console.log(getCoordinates("Lyon", "FR", "84"));

  })
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </Router>
  );
}

export default App;



