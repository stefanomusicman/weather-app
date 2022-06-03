import { useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { IoSearchCircle } from 'react-icons/io5';
import { BsSunFill } from 'react-icons/bs';

const Home: NextPage = () => {
  
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData]: any = useState('');
  
  const API_URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c4ee778626f5cd6222135068ec2fa634`
  
  const fetchData = async () => {
    let response = await fetch(API_URL);
    let data = await response.json();
    setWeatherData(data);
    setCity('');
  }
  console.log(weatherData);

  // let weather:string = weatherData.weather[0].main;
  // let temperature:number = weatherData.main.temp;
  // let feelsLike: number = weatherData.main.feels_like;
  
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
              {weatherData.main ? <h3>{weatherData.main.temp}F</h3> : null}
            </div>
            <div className={styles.smallBox}>
              <h4>Feels Like</h4>
              {weatherData.main ? <h3>{weatherData.main.feels_like}F</h3> : null}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.secondaryWeatherContainer}>
        <div className={styles.secondaryWeather}>

        </div>
      </div>
    </div>
  )
}

export default Home
