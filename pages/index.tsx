import { useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { IoSearchCircle } from 'react-icons/io5';
import { BsSunFill } from 'react-icons/bs';

const Home: NextPage = () => {
  
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>('');
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  
  const API_URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c4ee778626f5cd6222135068ec2fa634`
  
  const fetchData = async (): Promise<void> => {
    let response = await fetch(API_URL);
    let data = await response.json();
    setWeatherData(data);
    setCity('');
  }
  
  return (
    <div className={styles.primary}>
      <div className={styles.searchBox}>
        <input type="text" value={city} placeholder='Enter City' onChange={(event) => setCity(event.target.value)}/>
        <IoSearchCircle onClick={fetchData} className={styles.searchIcon}/>
      </div>
      <div style={{ visibility: !weatherData ? 'hidden' : 'visible' }} className={styles.mainWeatherContainer}>
        <div className={styles.mainWeather}>
          <div className={styles.weather}>
            {weatherData.name ? <h1>{weatherData.name}</h1> : null}
            <BsSunFill className={styles.weatherIcon}/>
            {weatherData.weather ? <h3>{weatherData.weather[0].main}</h3> : null}
          </div>
          <div className={styles.temperature}>
            <div className={styles.smallBox}>
              <h4>Temperature</h4>
              {isCelsius && weatherData.main ? <h3>{Math.floor(weatherData.main.temp - 273.15)}°C</h3> : null}
              {!isCelsius && weatherData.main ? <h3>{(Math.floor(weatherData.main.temp - 273.15) * 9/5) + 32}°F</h3> : null}
            </div>
            <div className={styles.smallBox}>
              <h4>Feels Like</h4>
              {isCelsius && weatherData.main ? <h3>{Math.floor(weatherData.main.feels_like - 273.15)}°C</h3> : null}
              {!isCelsius && weatherData.main ? <h3>{(Math.floor(weatherData.main.feels_like - 273.15) * 9/5) + 32}°F</h3> : null}
            </div>
          </div>
        </div>
      </div>
      <div style={{ visibility: !weatherData ? 'hidden' : 'visible' }} className={styles.secondaryWeatherContainer}>
        <div className={styles.secondaryWeather}>
          <div className={styles.topLeft}>
            <h4>Humidity</h4>
            {weatherData.main ? <h3>{weatherData.main.humidity}%</h3> : null}
          </div>
          <div className={styles.topRight}>
            <h4>Wind</h4>
            {weatherData.wind ? <h3>{Math.floor(weatherData.wind.speed * 3.6)} km/hr</h3> : null}
          </div>
          <div className={styles.bottomLeft}>
            <h4>Low</h4>
            {isCelsius && weatherData.main ? <h3>{Math.floor(weatherData.main.temp_min - 273.15)}°C</h3> : null}
            {!isCelsius && weatherData.main ? <h3>{(Math.floor(weatherData.main.temp_min - 273.15) * 9/5) + 32}°F</h3> : null}
          </div>
          <div className={styles.bottomRight}>
            <h4>High</h4>
            {isCelsius && weatherData.main ? <h3>{Math.floor(weatherData.main.temp_max - 273.15)}°C</h3> : null}
            {!isCelsius && weatherData.main ? <h3>{(Math.floor(weatherData.main.temp_max - 273.15) * 9/5) + 32}°F</h3> : null}
          </div>
        </div>
        <button className={styles.convertButton} onClick={() => setIsCelsius(!isCelsius)}>Convert Temperature</button>
      </div>
    </div>
  )
}

export default Home
