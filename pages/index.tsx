import { useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { IoSearchCircle } from 'react-icons/io5';

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
  
  return (
    <div className={styles.primary}>
      <div className={styles.searchBox}>
        <input type="text" value={city} placeholder='Enter City' onChange={(event) => setCity(event.target.value)}/>
        <IoSearchCircle onClick={fetchData} className={styles.searchIcon}/>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Home
