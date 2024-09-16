/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import env from "react-dotenv";
import WeatherDiv from "./components/WeatherDiv";
function App() {
  const [icons, setIcons] = useState([]);
  const [data, setData]= useState([]);
  const [destinations, setDestinations] = useState([
    { keys: "Eilat", name: "אילת" },
    { keys: "London", name: "לונדון" },
    { keys: "New York", name: "ניו יורק" },
    { keys: "Alaska,", name: "אלסקה" },
  ]);
  /*
    { keys: "Eilat,il", name: "אילת" },
    { keys: "London,uk", name: "לונדון" },
    { keys: "New York,us", name: "ניו יורק" },
    { keys: "Alaska,us", name: "אלסקה" }, */
  useEffect(() => {
    initializeDestinations();
  }, []);
  //option 1.
  async function initializeDestinations() {
    destinations.forEach(async (des) => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const weatherData = await response.json();
      const updatedDestination = { ...des, weatherData };

      // Update the state for each destination individually
      setDestinations((prevDestinations) =>
        prevDestinations.map((d) =>
          d.keys === des.keys ? updatedDestination : d
        )
      );
    });
  }
  
  return (
    <>
      <h1>hhh</h1>
      {destinations.map((des) => {
        console.log(des);
        return <WeatherDiv key={des.keys} destination={des} />;
      })}
    </>
  );
}

export default App;
