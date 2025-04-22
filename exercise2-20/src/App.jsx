import { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
    setWeather(null)
  }

  const filteredCountries = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  useEffect(() => {
    if (!selectedCountry) return

    const capital = selectedCountry.capital?.[0]
    if (!capital) return

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
      .then(response => setWeather(response.data))
      .catch(error => {
        console.error('Error fetching weather:', error)
        setWeather(null)
      })
  }, [selectedCountry])

  const CountryDetails = ({ country }) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital?.[0]}</p>
        <p>Area: {country.area}</p>

        <h4>Languages:</h4>
        <ul>
          {Object.values(country.languages || {}).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>

        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />

        {weather && (
          <div>
            <h3>Weather in {country.capital?.[0]}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    )
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
    setWeather(null)
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '1rem' }}>
      <label>Find countries: </label>
      <input value={filter} onChange={handleFilterChange} />

      <div style={{ marginTop: '1rem' }}>
        {selectedCountry ? (
          <CountryDetails country={selectedCountry} />
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter.</p>
        ) : filteredCountries.length === 1 ? (
          <CountryDetails country={filteredCountries[0]} />
        ) : (
          filteredCountries.map((country) => (
            <div key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShow(country)}>Show</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
