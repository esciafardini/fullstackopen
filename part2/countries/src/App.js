import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDisplay = ({ country, weather }) => {

  let icon = weather.weather[0].icon

  return <>
    <h1>{country.name.common}</h1>
    <div>capital: {country.capital[0]}</div>
    <div>area: {country.area}</div>
    <p>languages:</p>
    <ul>
      {Object.values(country.languages).map((obj) => <li key={obj}>{obj}</li>)}
    </ul>
    <img src={country.flags['png']} alt="FLAG" />
    <h2>
      Weather in {country.capital}:
    </h2>
    <div>
      temperature: {Math.round((weather.main.temp - 273.15) * 100) / 100}&deg; Celcius
    </div>
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="alternatetext" />
    <div>
      wind: {weather.wind.speed} m/s
    </div>
  </>
}

const CountryListItem = ({ names, clickHandler }) => {
  let nameDisplays = names.map(country => <div key={country.name.common}>
    {country.name.common}
    <button onClick={() => clickHandler(country)}>show</button>
  </div>
  )
  return <>
    <div>{nameDisplays}</div>
  </>
}

function App() {

  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [latLng, setLatLng] = useState([])
  const [weather, setWeather] = useState(null)

  const apiKey = process.env.REACT_APP_W;


  const clickShow = (country) => {
    setCountry(country)
    setSearch(country.name.common)
    setLatLng(country.capitalInfo.latlng)
    setShow(true)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data))
  }, [])

  useEffect(() => {
    setFilteredCountries(countries.filter((countryInfo) => countryInfo.name.common.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  useEffect(() => {
    let lat = latLng[0]
    let lon = latLng[1]
    lat && lon && axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then((res) => setWeather(res.data))
  }, [latLng])

  return (
    <>
      <input value={search} onChange={(e) => {
        setShow(false)
        setSearch(e.target.value)
      }} />
      {(filteredCountries.length > 10) && <div>Too many matches, specify another filter</div>}
      {(filteredCountries.length <= 10) && <CountryListItem clickHandler={clickShow} names={filteredCountries} />}
      {show && weather && <CountryDisplay country={country} weather={weather} />}
    </>
  );
}

export default App;
