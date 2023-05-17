import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CountryDisplay = ({ country, weather }) => {

  const { name, capital, area, languages, flags } = country
  const { main, wind } = weather
  const { icon } = weather.weather[0]

  return <>
    <h1>{name.common}</h1>
    <div>capital: {capital[0]}</div>
    <div>area: {area}</div>
    <p>languages:</p>
    <ul>
      {Object.values(languages).map((obj) => <li key={obj}>{obj}</li>)}
    </ul>
    <img src={flags['png']} alt="FLAG" />
    <h2>
      Weather in {capital}:
    </h2>
    <div>
      temperature: {Math.round((main.temp - 273.15) * 100) / 100}&deg; Celcius
    </div>
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="alternatetext" />
    <div>
      wind: {wind.speed} m/s
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
  const weatherUrl = 'https://restcountries.com/v3.1/all'

  console.log('rendered')

  const clickShow = useCallback((country) => {
    setCountry(country);
    setSearch(country.name.common);
    setLatLng(country.capitalInfo.latlng);
    setShow(true);
  }, []);

  const getCountries = useCallback(async () => {
    try {
      const res = await axios.get(weatherUrl);
      setCountries(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getWeather = useCallback(async (lat, lon) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      setWeather(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [apiKey])

  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    setFilteredCountries(countries.filter((countryInfo) => countryInfo.name.common.toLowerCase().includes(search.toLowerCase())))
  }, [search, countries])

  useEffect(() => {
    let lat = latLng[0]
    let lon = latLng[1]
    if (lat && lon) {
      getWeather(lat, lon)
    }
  }, [latLng, apiKey, getWeather])

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
