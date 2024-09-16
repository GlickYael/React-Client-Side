/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
const apiKey = import.meta.env.VITE_API_KEY;
import WeatherDiv from "./components/WeatherDiv";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';




function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [icons, setIcons] = useState([]);
  const [destinations, setDestinations] = useState([
    "Eilat",
    "London",
    "New York",
    "Alaska",
  ]);
  const [desWeather, setDesWeather] = useState([]);
  useEffect(() => {
    initializeDestinations();
  }, []);


  async function initializeDestinations() {
    setIsLoading(true);
    try {
      const weatherDataArray = await Promise.all(
        destinations.map(async (des) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${des}&appid=${apiKey}&lang=he&units=metric`
          );
          const weatherData = await response.json();
          return weatherData;
        })
      );
      setDesWeather(weatherDataArray);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AppBar position="static" sx={{width:"100%"}}>
      <Typography variant="h1" color="inherit" component="div">
      תחזיות מזג האוויר
    </Typography>
        </AppBar>
      <h2>{desWeather.name}</h2>
      {isLoading && !error && <div>טוען...</div>}
      {!isLoading && error && (
        <div>התרחשה שגיאה, לא ניתן לטעון את הטמפרטורות </div>
      )}
      <div className="destinations_container">
        {desWeather.map((desWeather) => {
          console.log(desWeather);
          return <WeatherDiv key={desWeather.name} desWeather={desWeather} />;
        })}
      </div>
    </>
  );
}

export default App;
/*

import { useState, useEffect } from "react";
import "./App.css";
import WeatherDiv from "./components/WeatherDiv";
const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [icons, setIcons] = useState([]);
  const [destinations, setDestinations] = useState([
    "Eilat",
    "London",
    "New York",
    "Alaska",
  ]);
  const [desWeather, setDesWeather] = useState([]);
  useEffect(() => {
    initializeDestinations();
  }, []);

  async function initializeDestinations() {
    setIsLoading(true);
    try {
      const weatherDataArray = await Promise.all(
        destinations.map(async (des) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${des}&appid=${apiKey}&lang=he&units=metric`
          );
          const weatherData = await response.json();
          return weatherData;
        })
      );
      setDesWeather(weatherDataArray);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <nav>
        <h1>תחזיות מזג האוויר</h1>
      </nav>
      <h2>{desWeather.name}</h2>
      {isLoading && !error && <div>טוען...</div>}
      {!isLoading && error && (
        <div>התרחשה שגיאה, לא ניתן לטעון את הטמפרטורות </div>
      )}
      {!destinations.name
        ? null
        : 
      desWeather.map((desWeather) => {
            console.log(desWeather);
            return <WeatherDiv key={desWeather.name} desWeather={desWeather} />;
          })}
    </>
  );
}

export default App;

*/
