import React, { useEffect } from 'react'
import { useState, useRef } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import Forecast from './Forecast';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import News from './News';



const weatherApi = {

  key: 'b394ce5acb5e1d343fe73bb0c054aba3',
  base: "https://api.openweathermap.org/data/2.5/",

};

const newsApi = {
  key: "36e0018d616145ebb8938f16bdb86933",
  base: 'https://newsapi.org/v2/everything?q=${city}&apiKey=${NEWS_API_KEY}',
}

const keys = "36e0018d616145ebb8938f16bdb86933"

function Weather({ title, description, url, urlToImage }) {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState("");
  const [city, setCity] = useState("");
  const [news, setNews] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


  const searchPressed = () => {
    fetch(`${weatherApi.base}weather?q=${search}&units=metric&APPID=${weatherApi.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Weather API request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        let weather = result

        console.log("result", weather)
        setWeather(weather);
        setCity(weather.name)
        console.log(weather.name);
      })

      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });

    //forecast

    fetch(`${weatherApi.base}forecast?q=${search}&units=metric&APPID=${weatherApi.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`forecast API request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        let forecast = result

        console.log("forecast", forecast)
        setForecast(forecast);
      })

      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });

    console.log(forecast);

    //Newsapi
    fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${keys}`)
      .then(res => res.json())
      .then(data => {
        let news = data.articles
        setNews(news)
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });

  }

  console.log('news', news);


  useEffect(() => {
    
    const getLocation = async () => {

      try{



        let longitude,latitude ;

        const getPosition = () => {
          return new Promise((resolve, reject) =>{
            navigator.geolocation.getCurrentPosition(resolve,reject)
          })
        }

        const position = await getPosition();
        latitude = (position.coords.latitude)
        longitude = (position.coords.longitude)

      
      await fetch(`${weatherApi.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${weatherApi.key}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Weather API request failed with status ${res.status}`);
          }
          return res.json();
        })
        .then((result) => {
          let weather = result

          console.log("result", weather)
          setWeather(weather);
          setCity(weather.name)
          console.log(weather.name);
        })

      //forecast

       await fetch(`${weatherApi.base}forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${weatherApi.key}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`forecast API request failed with status ${res.status}`);
          }
          return res.json();
        })
        .then((result) => {
          let forecast = result

          console.log("forecast", forecast)
          setForecast(forecast);
        })

        
      console.log(forecast);

      await fetch(`https://newsapi.org/v2/everything?q=${city}&apiKey=${newsApi.key}`)
            .then(res => res.json())
            .then(data =>{
              let news = data.articles
              setNews(news)
            });

      }catch(error){
  
          console.error('Error fetching weather data:', error);
      }
      
    }
    getLocation();



  }, [])

  return (
    <div  >
      <header className="App-header">
        <h1>Your weather today!</h1>
        <br></br>
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          < AiOutlineSearch onClick={searchPressed} />
        </div>
        <br></br>
        <Card style={{ width: '18rem' }}>
          {/* If weather is not undefined display results from API */}
          {typeof weather.main !== "undefined" ? (
            <div>
              {/* Location  */}
              <p>{weather.name}</p>

              {/* Temperature Celsius  */}
              <p><span>Temperature:</span>{weather.main.temp}°C</p>
              <p><span>Feels like:</span>{weather.main.feels_like}</p>
              <p><span>Humidity:</span>{weather.main.humidity}</p>
              <p><span>Wind-speed:</span>{weather.main.wind}</p>

              {/* Condition (Sunny ) */}
              <p>{weather.weather[0].main}</p>
              <p>({weather.weather[0].description})</p>
            </div>
          ) : ("")}
        </Card>
        {forecast && (< Forecast data={forecast} />)}

        <div className='news-app'>
          <div className='news-item'>
            <img className='news-img' src={urlToImage} alt={url} />
            <h3><a href={url}>{title}</a></h3>
            <p>{description}</p>
            <p>{ }</p>

          </div>
        </div>

      </header>
      {news && (< News news={news} />)}
    </div>
  )
}

export default Weather
