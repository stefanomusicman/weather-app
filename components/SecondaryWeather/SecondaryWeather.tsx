import React, { useContext } from 'react';
import { Context } from '../../context/context';
import styles from './SecondaryWeather.module.css';

const SecondaryWeather:React.FC<{weatherData: any}> = ({weatherData}) => {

    const {isCelsius, isNotCelsius} = useContext(Context);

    return(
        <div style={{ visibility: !weatherData ? 'hidden' : 'visible' }} className={styles.secondaryWeatherContainer}>
          <div className={styles.secondaryWeather}>
            <div className={styles.topLeft}>
              <h4>Humidity</h4>
              <h3>{weatherData?.main.humidity}%</h3>
            </div>
            <div className={styles.topRight}>
              <h4>Wind</h4>
              <h3>{Math.floor(weatherData?.wind.speed * 3.6)} km/hr</h3>
            </div>
            <div className={styles.bottomLeft}>
              <h4>Low</h4>
              {isCelsius && <h3>{Math.floor(weatherData?.main.temp_min - 273.15)}°C</h3>}
              {!isCelsius && <h3>{(Math.floor(weatherData?.main.temp_min - 273.15) * 9/5) + 32}°F</h3>}
            </div>
            <div className={styles.bottomRight}>
              <h4>High</h4>
              {isCelsius && <h3>{Math.floor(weatherData?.main.temp_max - 273.15)}°C</h3>}
              {!isCelsius && <h3>{(Math.floor(weatherData?.main.temp_max - 273.15) * 9/5) + 32}°F</h3>}
            </div>
          </div>
          <button className={styles.convertButton} onClick={() => isNotCelsius()}>Convert Temperature</button>
        </div>
    )
}

export default SecondaryWeather;