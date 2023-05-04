import { useState } from 'react'
import axios from "axios";

function SearchBar(){
    const [weatherData, setWeatherData] = useState(null)
    const [searchInput, setSearchInput] = useState("");
    function getData(city) {
        axios({
          method: "GET",
          url:"http://api.weatherapi.com/v1/forecast.json?key=aef7c1896cc547c8950184941232102&q=London&days=4&aqi=no&alerts=no",
        })
        .then((response) => {
          const res =response.data
          setWeatherData(({
            profile_name: res.location.name,
            temp_f: res.current.temp_f}))
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}
        const handleChange = (e) => {
            e.preventDefault();
            setSearchInput(e.target.value);
          };
        return (
            <input
   type="text"
   placeholder="Search here"
   onChange={handleChange}
   value={searchInput} 
   onSubmit={()=> getData(searchInput)}/>
        )
        //end of new line 
}

export default SearchBar;