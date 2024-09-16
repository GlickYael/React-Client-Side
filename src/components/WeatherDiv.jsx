/* eslint-disable react/prop-types */
function WeatherDiv({destination}) {
    
  return (
    <div>
        <h2>שם: {destination.name}</h2>
        <ul>
            <li>{destination.description}</li>
            <li>הטמפרטורה {destination.temp}</li>
            <li>{destination.feels_like}</li>
            <li>{destination.humidity}</li>
        </ul>
    </div>
  )
}

export default WeatherDiv;
