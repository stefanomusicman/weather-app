import React, { useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { IoSearchCircle } from 'react-icons/io5';
import ErrorPopup from '../components/ErrorPopup/ErrorPopup';
import SecondaryWeather from '../components/SecondaryWeather/SecondaryWeather';
import PrimaryWeather from '../components/PrimaryWeather/PrimaryWeather';

const Home: NextPage = () => {
  
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>('');
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
        <PrimaryWeather weatherData={weatherData ? weatherData : null}/>
        <SecondaryWeather weatherData={weatherData ? weatherData : null}/>
      </div>}
    </React.Fragment>
  )
}

export default Home
