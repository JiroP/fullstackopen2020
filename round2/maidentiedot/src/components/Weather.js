import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [city, api_key]);

  return weather ? (
    <div>
      <div>
        <b>temperature:</b> {weather.current.temperature}{" "}
      </div>
      <img src={weather.current.weather_icons[0]} alt="weather symbol" />
      <div>
        <b>wind: </b> {weather.current.wind_speed} mph direction{" "}
        {weather.current.wind_dir}
      </div>
    </div>
  ) : null;
};

export default Weather;
