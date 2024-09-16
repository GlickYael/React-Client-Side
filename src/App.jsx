/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import WeatherDiv from "./components/WeatherDiv";
const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [icons, setIcons] = useState([]);
  const [destinations, setDestinations] = useState([
    "Eilat",
    "London",
    "New York",
    "Alaska"
  ]);
  const [desWeather, setDesWeather] = useState([]);
  useEffect(() => {
    initializeDestinations();
  }, []);

  async function initializeDestinations() {
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
  }

  return (
    <>
      <nav>
        <h1>תחזיות מזג האוויר</h1>
      </nav>
      {desWeather.map((desWeather) => {
        console.log(desWeather);
        return <WeatherDiv key={desWeather.name} desWeather={desWeather} />;
      })}
    </>
  );
}

export default App;
