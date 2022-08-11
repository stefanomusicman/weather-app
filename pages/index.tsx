import React, { useContext, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { IoSearchCircle } from 'react-icons/io5';
import { BsSunFill } from 'react-icons/bs';
import { BsCloudFill } from 'react-icons/bs';
import { BsCloudRainFill } from 'react-icons/bs';
import { IoThunderstorm } from 'react-icons/io5'
import ErrorPopup from '../components/ErrorPopup/ErrorPopup';
import SecondaryWeather from '../components/SecondaryWeather/SecondaryWeather';
import { Context } from '../context/context';

const Home: NextPage = () => {

  const {isCelsius} = useContext(Context);
  
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>('');
  // const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(true);
  
  const API_URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c4ee778626f5cd6222135068ec2fa634`
  
  const fetchData = (): void => {
    fetch(API_URL)
    .then(res => {
      if(!res.ok) {
        throw Error('invalid location');
      } else {
        return res.json();
      }
    })
    .then(data => {
      setWeatherData(data);
      setCity('');
    })
    .catch(err => {
      console.log(err.message);
      setIsValid(false);
    })
  }

  const iconGenerator = (weather: string): any => {
    let cloud: RegExp = new RegExp('cloud');
    let sun: RegExp = new RegExp('sun'); 
    let rain: RegExp = new RegExp('rain');
    let mist: RegExp = new RegExp('mist');
    let thunder: RegExp = new RegExp('thunder');

    if(cloud.test(weather) === true) {
      return <BsCloudFill className={styles.weatherIcon}/>
    } else if(sun.test(weather) === true) {
      return <BsSunFill className={styles.weatherIcon}/>
    } else if(rain.test(weather) === true || mist.test(weather) === true) {
      return <BsCloudRainFill className={styles.weatherIcon}/>
    } else if(thunder.test(weather) === true) {
      return <IoThunderstorm className={styles.weatherIcon}/>
    } else {
      return <BsSunFill className={styles.weatherIcon}/>
    }
  }

  const returnToApp = (): void => {
    setIsValid(true);
  }

  
  return (
    <React.Fragment>
      {!isValid && <ErrorPopup return={returnToApp}/>}
      {isValid && <div className={styles.primary}>
        <div className={styles.searchBox}>
          <input type="text" value={city} placeholder='Enter City' onChange={(event) => setCity(event.target.value)}/>
          <IoSearchCircle onClick={fetchData} className={styles.searchIcon}/>
        </div>
        <div style={{ visibility: !weatherData ? 'hidden' : 'visible' }} className={styles.mainWeatherContainer}>
          <div className={styles.mainWeather}>
            <div className={styles.weather}>
              <h1>{weatherData?.name}</h1>
              {weatherData.weather ? iconGenerator(weatherData.weather[0].main.toLowerCase()) : null}
              {weatherData.weather ? <h3>{weatherData.weather[0].main}</h3> : null}
            </div>
            <div className={styles.temperature}>
              <div className={styles.smallBox}>
                <h4>Temperature</h4>
                {isCelsius && <h3>{Math.floor(weatherData.main?.temp - 273.15)}°C</h3>}
                {!isCelsius && <h3>{(Math.floor(weatherData.main?.temp - 273.15) * 9/5) + 32}°F</h3>}
              </div>
              <div className={styles.smallBox}>
                <h4>Feels Like</h4>
                {isCelsius && <h3>{Math.floor(weatherData.main?.feels_like - 273.15)}°C</h3>}
                {!isCelsius && <h3>{(Math.floor(weatherData.main?.feels_like - 273.15) * 9/5) + 32}°F</h3>}
              </div>
            </div>
          </div>
        </div>
        {/* <div style={{ visibility: !weatherData ? 'hidden' : 'visible' }} className={styles.secondaryWeatherContainer}>
          <div className={styles.secondaryWeather}>
            <div className={styles.topLeft}>
              <h4>Humidity</h4>
              <h3>{weatherData.main?.humidity}%</h3>
            </div>
            <div className={styles.topRight}>
              <h4>Wind</h4>
              <h3>{Math.floor(weatherData.wind?.speed * 3.6)} km/hr</h3>
            </div>
            <div className={styles.bottomLeft}>
              <h4>Low</h4>
              {isCelsius && <h3>{Math.floor(weatherData.main?.temp_min - 273.15)}°C</h3>}
              {!isCelsius && <h3>{(Math.floor(weatherData.main?.temp_min - 273.15) * 9/5) + 32}°F</h3>}
            </div>
            <div className={styles.bottomRight}>
              <h4>High</h4>
              {isCelsius && <h3>{Math.floor(weatherData.main?.temp_max - 273.15)}°C</h3>}
              {!isCelsius && <h3>{(Math.floor(weatherData.main?.temp_max - 273.15) * 9/5) + 32}°F</h3>}
            </div>
          </div>
          <button className={styles.convertButton} onClick={() => setIsCelsius(!isCelsius)}>Convert Temperature</button>
        </div> */}
      <SecondaryWeather weatherData={weatherData ? weatherData : null}/>
      </div>}
    </React.Fragment>
  )
}

export default Home
