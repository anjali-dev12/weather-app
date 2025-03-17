import React, { useState } from 'react'
import cloud from "../images/Clouds.png"
import rain from "../images/Rain.png"
import mist from "../images/mist.png"
import err from "../images/error.png"
import clear from "../images/Clear.png"

const Myapp = () => {

  const [search, setSearch] = useState("");   // for searching data
  const [data, setData] = useState();
  const [error, setError] = useState();      // for handling error

  const API_KEY = "194700b1795625fd304f4a863557527e"
  const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"


  //for calling input data
  const handelInput = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  }

  //for fetching api data

  const myFun = async () => {
    const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
    const jsonData = await get.json()
    console.log(jsonData);
    setData(jsonData)

    if (search === "") {
      //alert("Enter City Name")
      setError("Please Enter Name ")
    }
    else if (jsonData.cod == '404') {
      setError("Please Enter Valid Name !")
    }
    else {
      setError("")
    }
    setSearch("")
  }
  return (
    <>
      <div className='container'>
        <div className='inputs'>

          <input type='text' placeholder='Enter City,Country' onChange={handelInput} value={search} />

          <button onClick={myFun}>Search</button>
        </div>
        <div>
          {
            error ?
              <div className='errorPage'>
                <p>{error}</p>
                <img src={err} />
              </div> : ""
          }
          
          {
                data && data.weather ?
                <div className='weathers'>
                    <h2 className='cityName'>{data.name}</h2>
                    <img src={data.weather[0].main == "Clouds" ? cloud : "" }/>
                    <img src={data.weather[0].main == "Rain" ? rain : "" }/>
                    <img src={data.weather[0].main == "Clear" ? clear : "" }/>
                    <img src={data.weather[0].main == "Mist" ? mist : "" }/>
                    <img src={data.weather[0].main == "Haze" ? cloud : "" }/>

                    <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
                    <p  className='climate'>{data.weather[0].description}</p>

                </div> : ""
            }

            </div>
        </div>
     </>
  )
}

export default Myapp