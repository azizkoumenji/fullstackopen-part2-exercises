import { useEffect } from "react";
import { useState } from "react";
import services from "../services/search";

export default function View({ list }) {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    services
      .getWeather(list)
      .then((resData) =>
        setWeather([
          resData.main.temp,
          resData.wind.speed,
          resData.weather[0].icon,
        ])
      );
  }, [list]);

  if (weather.length !== 0) {
    return (
      <>
        <h1>{list[0].name.common}</h1>
        <p>Capital: {list[0].capital}</p>
        <p>Area: {list[0].area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.values(list[0].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={list[0].flags.png} alt={list[0].flags.alt} />
        <h2>Weather in {list[0].name.common}</h2>
        <p>Temperature: {weather[0]} C</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather[2]}@2x.png`}
          alt="Weather Icon"
        />
        <p>Wind: {weather[1]} meter/sec</p>
      </>
    );
  } else return null;
}
