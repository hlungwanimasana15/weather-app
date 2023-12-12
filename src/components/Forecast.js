import React from 'react';


const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Forecast({ data }) {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  console.log('text', data);

  return (
    <>
    
    <div className="forecast-container">
    <h1>Daily Forecast</h1>
      <div className="forecast-days-container">
        {data.list.slice(0, 7).map((item, index) => (
          <div key={index} className="daily-item">
            <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
            <div className="daily-details">
              <span className="day">{forecastDays[index]}</span>
              <span className="description">{item.weather[0].description}</span>
              <div className="min-max">
                {Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C
              </div>
            </div>
            <div className="daily-details-grid">
              <div className="daily-details-grid-item">
                <label>Pressure:</label>
                <span>{item.main.pressure}</span>
              </div>
              <div className="daily-details-grid-item">
                <label>Humidity:</label>
                <span>{item.main.humidity}</span>
              </div>
              <div className="daily-details-grid-item">
                <label>Clouds:</label>
                <span>{item.clouds.all}%</span>
              </div>
              <div className="daily-details-grid-item">
                <label>Wind speed:</label>
                <span>{item.wind.speed} m/s</span>
              </div>
              <div className="daily-details-grid-item">
                <label>Sea level:</label>
                <span>{item.main.sea_level}m</span>
              </div>
              <div className="daily-details-grid-item">
                <label>Feels like:</label>
                <span>{item.main.feels_like}°C</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Forecast;
