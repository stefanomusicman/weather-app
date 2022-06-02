import { useState } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState('');

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c4ee778626f5cd6222135068ec2fa634`

  return (
    <div className={styles.primary}>

    </div>
  )
}

export default Home
