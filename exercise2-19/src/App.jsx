// App.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); // برای دکمه Show

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => setCountries(res.data));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSelectedCountry(null); // هر بار جستجو عوض شد، کشور انتخاب‌شده رو پاک کن

    const matched = countries.filter(c =>
      c.name.common.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(matched);
  };

  const handleShowClick = (country) => {
    setSelectedCountry(country);
  };

  const CountryDetails = ({ country }) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      </div>
    );
  };

  const renderCountries = () => {
    if (search === '') return null;

    if (selectedCountry) {
      return <CountryDetails country={selectedCountry} />;
    }

    if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (filtered.length > 1) {
      return filtered.map(c => (
        <div key={c.cca3} style={{ marginBottom: '0.5rem' }}>
          {c.name.common}{' '}
          <button onClick={() => handleShowClick(c)}>Show</button>
        </div>
      ));
    }

    if (filtered.length === 1) {
      return <CountryDetails country={filtered[0]} />;
    }

    return <p>No matches</p>;
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <label>
        Find countries:{" "}
        <input
          value={search}
          onChange={handleChange}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </label>

      <div style={{ marginTop: '2rem' }}>
        {renderCountries()}
      </div>
    </div>
  );
}

export default App;
