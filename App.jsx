//!weather api

import axios from 'axios';
import React, { useState } from 'react'

export default function App1() {
  let[location,setLocation]=useState("location")
  let[details,setDetails]=useState({
    temp: 20,
    humidity:20,
    wind:2.5,
    img: "https://openweathermap.org/img/wn/10d@2x.png",
  });
  let handleSubmit=(e)=>{
    e.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d83b80e7283958f4f9a8c4e2cc36d5e3`)
    .then(
      ({data})=>{
        let {name,main,wind,weather}=data;
        console.log(data);
        setDetails({
          humidity:main.humidity,
          wind:wind.speed,
          temp: parseInt(main.temp -273.15),
          img:`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        });
        setLocation(name);
      },
      (e)=>e
    );
  }
  return (
    <div className='container'>
      <div className='sub'>
        <form onSubmit={handleSubmit} >
          <input
          type="text"
          name="location"
          id="location"
          placeholder='enter location'
          // onChange={(e)=> e.target.value}
          onChange={(e)=>setLocation(e.target.value)}
          />
        <button type='submit' > search</button>
        </form>
        <div className='display_temp'>
        <h1>{details.temp}°C</h1>
        <img
        src= {details.img}
         alt="img-1"
          style={{width:"100px", height:"100px"}}
        />
        <h3>{location}</h3>
        </div>
        <div className='display_details'>
          <aside>
            <h2>humidity:{details.humidity}%</h2>
          </aside>
          <aside>
            <h2>wind-speed:{details.wind}km/hr</h2>
          </aside>
        </div>
      </div>
    </div>
  )
}
