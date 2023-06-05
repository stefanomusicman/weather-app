import React, { useContext } from "react";
import { Context } from "../../context/context";
import styles from './PrimaryWeather.module.css';
import { BsSunFill } from 'react-icons/bs';
import { BsCloudFill } from 'react-icons/bs';
import { BsCloudRainFill } from 'react-icons/bs';
import { IoThunderstorm } from 'react-icons/io5'


const PrimaryWeather:React.FC<{weatherData: any}> = ({weatherData}) => {

    const { determineTemp } = useContext(Context);

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

    return(
        <div style={{ visibility: !weatherData ? 'hidden' : 'visible' }} className={styles.mainWeatherContainer}>
          <div className={styles.mainWeather}>
            <div className={styles.weather}>
              <h1>{weatherData?.name}</h1>
              {weatherData?.weather ? iconGenerator(weatherData.weather[0].main.toLowerCase()) : null}
              {weatherData?.weather ? <h3>{weatherData.weather[0].main}</h3> : null}
            </div>
            <div className={styles.temperature}>
              <div className={styles.smallBox}>
                <h4>Temperature</h4>
                {determineTemp(weatherData?.main.temp)}
              </div>
              <div className={styles.smallBox}>
                <h4>Feels Like</h4>
                {determineTemp(weatherData?.main.temp)}
              </div>
            </div>
          </div>
        </div>
    )
}

export default PrimaryWeather;