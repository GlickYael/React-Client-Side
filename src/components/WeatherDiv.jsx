/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Grid from '@mui/material/Grid2';

import {useState} from "react"

function WeatherDiv({ desWeather }) {
  const [icon,setIcon]= useState((desWeather.main.temp<=20)?(<FlashOnIcon sx={{color:"#3f51b5"}}/>):((desWeather.main.temp<30)?<CloudIcon sx={{color:"#42a5f5"}}/>:<WbSunnyIcon sx={{color:"#f57c00"}}/>))
  return ( 
    <Card sx={{ minWidth: 275, backgroundColor: "#e3f2fd", margin: 5 }}>
      <CardContent>
        <Grid container justifyContent="space-between" spacing={2} sx={{textAlign:"right"}}>
          <Grid>
            <Grid>
              <Typography variant="h3" component="p" sx={{ fontWeight: 900, color: "text.secondary" }}>{desWeather.name}</Typography>
              <Typography component="p" sx={{ color: "text.secondary" }} >{desWeather.weather[0].description}</Typography>
            </Grid>
            <Grid >
              <Grid><p>טמפרטורה נמדדת: {desWeather.main.temp}°C</p></Grid>
              <Grid><p>טמפרטורה מורגשת: {desWeather.main.feels_like}°C</p></Grid>
              <Grid><p>אחוזי הלחות: {desWeather.main.humidity}%</p></Grid>
            </Grid>
          </Grid>
          <Grid><p>{icon}</p></Grid>
        </Grid> 
      </CardContent>
    </Card>
  );
}

export default WeatherDiv;
