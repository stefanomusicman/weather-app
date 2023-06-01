import React, { useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { IoSearchCircle } from 'react-icons/io5';
import ErrorPopup from '../components/ErrorPopup/ErrorPopup';
import SecondaryWeather from '../components/SecondaryWeather/SecondaryWeather';
import PrimaryWeather from '../components/PrimaryWeather/PrimaryWeather';
import getConfig from 'next/config';

const Home: NextPage = () => {
  
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const { publicRuntimeConfig } = getConfig();
  const apiKey = publicRuntimeConfig.API_KEY;
  
  const images:string[] = useMemo(() => [
    '/animated.jpg',
    '/animated-2.jpg',
    '/animated-3.jpg',
    '/animated-6.jpg',
  ], []);
  
  const [image, setImage] = useState(images[0]);
  
  const API_URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  
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

  // responsible for changing the background image
  useEffect(() => {
    const imageUrl: string = images[Math.floor(Math.random() * 4)];
    setImage(imageUrl);
  },[weatherData,images])

  return (
    <React.Fragment>
      {!isValid && <ErrorPopup return={returnToApp}/>}
      {isValid && <div style={{backgroundImage: `url(${image})`}} className={styles.primary}>
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
