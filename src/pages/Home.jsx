/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
import WeatherDiv from "../components/WeatherDiv";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [measureTime, setMeasureTime] = useState(null);
    const [destinations, setDestinations] = useState([
        "Eilat",
        "London",
        "New York",
        "Alaska"
    ]);
    const [desWeather, setDesWeather] = useState([]);
    useEffect(() => {
        initializeDestinations();
        const interval = setInterval(() => {
            initializeDestinations();
        }, 100000);

        return () => clearInterval(interval);
    }, []);


    async function initializeDestinations() {
        setError(false);
        if (desWeather.length === 0) {
            setIsLoading(true);
        }
        try {
            const weatherDataArray = await Promise.all(
                destinations.map(async (des) => {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${des}&appid=${apiKey}&lang=he&units=metric`
                    );
                    if (!response.ok) {
                        throw new Error();
                    }
                    const weatherData = await response.json();
                    return weatherData;
                })
            );
            setDesWeather(weatherDataArray);
        } catch (err) {
            if (desWeather.length === 0) {
                setError(true);
            }
            else {
                console.log(err);
            }
        } finally {
            setIsLoading(false);
            setMeasureTime(Date().toLocaleString())
        }
    }

    return (
        <>
            <AppBar position="sticky" sx={{ width: "100%", top: "0" }}>
                <Typography variant="h1" color="inherit" component="div">
                    תחזית מסביב לעולם
                </Typography>
            </AppBar>
            {isLoading && <Box sx={{ display: "block", width: "100%" }}>
                <CircularProgress />
            </Box>}
            {error && (
                <div>התרחשה שגיאה, לא ניתן לטעון את הטמפרטורות </div>
            )}
            <div className="destinations_container">
                {desWeather.map((desWeather) => {
                    console.log(desWeather);
                    return <WeatherDiv key={desWeather.name} desWeather={desWeather} />;
                })}
            </div>
            <footer>{measureTime != null && !error && <p>נכון לתאריך: {measureTime}</p>}</footer>
        </>
    );
}

export default Home;
