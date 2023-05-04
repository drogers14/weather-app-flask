import { useState } from "react";
import axios from "axios";
import "./App.css";
import Marquee from "react-fast-marquee";
import Menu from "./Menu.js";
import sunny from "./pics/sunnysideup.png"; // with import
import partlycloudy from "./pics/partlycloudy.png"; // with import
import cloudy from "./pics/cloudy.png"; // with import
import moon from "./pics/bluemoon.png";
import lightrain from './pics/light-rain.png';
const WEATHER_API = process.env.REACT_APP_WEATHER_API_URL;
//"https://weather-machine-385620.uw.r.appspot.com"
function App() {
  // new line start
  const [weatherData, setWeatherData] = useState(null);
  const [searchInput, setSearchInput] = useState(0);
  const [name, setName] = useState("");
  const [daytime, setDayTime] = useState(1);

  const getWeatherData = (name) => {
    axios({
      method: "GET",
      url: `${WEATHER_API}/weather/${name}`,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setDayTime(res.current.is_day);
        const arr = res.location.localtime.split(" ");
        console.log(arr);
        setWeatherData({
          name: res.location.name,
          temp_f: res.current.temp_f,
          condition: res.current.condition.text,
          is_day: res.current.is_day,
          date: arr[0],
          time: arr[1],
          region: res.location.region,
          country: res.location.country, 
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  return (
    <div className="App">
      <Marquee pauseOnHover="true">
        <h3>
          How's the weather down there? • You are so foggin' cute! • I mist you{" "}
          • Why are the clouds always throwing shade? • This weather is SNOW
          laughing matter •
        </h3>
      </Marquee>
      {/* <Menu/> */}
      <header className={daytime === 1 ? "App-header-day" : "App-header"}>
        <h1>Weather Machine</h1>
        <label>
          Search City or Zip Code:
          <input
            type="text"
            className="searchTerm"
            value={name}
            placeholder="Seoul or 87109"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <button
          type="submit"
          onClick={() => {
            getWeatherData(name);
          }}
        >
          Click me
        </button>
        {weatherData && (
          <div>
            <p>{weatherData.time} {(parseInt(weatherData.time.substring(0,weatherData.time.indexOf(":"))) >= 0 && parseInt(weatherData.time.substring(0,weatherData.time.indexOf(":"))) <= 11) ? 'AM' : 'PM'} </p>
            {weatherData.condition === "Partly cloudy" && (
              <img src={partlycloudy} />
            )}
            {weatherData.condition === "Sunny" && <img src={sunny} />}
            {weatherData.condition === "Overcast" && <img src={cloudy} />}
            {weatherData.condition === "Light rain" && <img src={lightrain} />}
            {weatherData.condition === "Heavy rain" && <img src={lightrain} />}
            {weatherData.condition === "Clear" && weatherData.is_day === 0 && (
              <img src={moon} />
            )}
            <p>
              It is {weatherData.temp_f}°F in {weatherData.name}, {weatherData.region ? weatherData.region : weatherData.country}
            </p>
            <p>{weatherData.condition}</p>
          </div>
        )}
        {/* end of new line */}
      </header>
    </div>
  );
}

export default App;
