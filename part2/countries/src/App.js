import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryNames = ({ names }) => {
  let nameDisplays = names.map(item => <div> {item} </div>)
  return <div>{nameDisplays}</div>
}

function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data.map((countryInfo) => countryInfo.name.common)))
  }, [])

  useEffect(() => {
    setFilteredCountries(countries.filter((countryName) => countryName.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  return (
    <>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {(filteredCountries.length > 10) && <div>Too many matches, specify another filter</div>}
      {(filteredCountries.length <= 10 && filteredCountries.length !== 1) && <CountryNames names={filteredCountries} />}
      {(filteredCountries.length === 1) && <div>a beautiful display</div>}
    </>
  );
}

export default App;
