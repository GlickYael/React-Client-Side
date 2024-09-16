/* eslint-disable react/prop-types */
function WeatherDiv({desWeather}) {

  return (
    <div>
        <h2>{desWeather.name}</h2>
        <ul>
            <li>{desWeather.weather[0].description}</li>
            <li>הטמפרטורה {desWeather.main.temp} C</li>
            <li>מרגיש כמו: {desWeather.main.feels_like}</li>
            <li>אחוזי הלחות{desWeather.main.humidity}%</li>
        </ul>
    </div>
  )
}

export default WeatherDiv;
