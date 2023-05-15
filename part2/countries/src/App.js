import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDisplay = ({ country }) => {
  return <>
    <h1>{country.name.common}</h1>
    <div>capital: {country.capital[0]}</div>
    <div>area: {country.area}</div>
    <p>languages:</p>
    <ul>
      {Object.values(country.languages).map((obj) => <li>{obj}</li>)}
    </ul>
    <img src={country.flags['png']} alt="FLAG" />
  </>
}

const CountryListItem = ({ names, clickHandler }) => {
  let nameDisplays = names.map(item => <div>
    {item.name.common}
    <button onClick={() => clickHandler(item.name.common)}>show</button>
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

  const clickShow = (countryName) => {
    setSearch(countryName)
    setShow(true)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data))
  }, [])

  useEffect(() => {
    setFilteredCountries(countries.filter((countryInfo) => countryInfo.name.common.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  return (
    <>
      <input value={search} onChange={(e) => {
        setShow(false)
        setSearch(e.target.value)
      }} />
      {(filteredCountries.length > 10) && <div>Too many matches, specify another filter</div>}
      {(filteredCountries.length <= 10) && <CountryListItem clickHandler={clickShow} names={filteredCountries} />}
      {show && <CountryDisplay country={filteredCountries[0]} />}
    </>
  );
}

export default App;
