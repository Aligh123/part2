import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    const match = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(match);
  };

  const inlineBox = {
    border: "1px solid gray",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    backgroundColor: "#f5f5f5"
  };

  const renderCountries = () => {
    if (search === "") return null;
    if (filtered.length > 10) {
      return <p>Too many matches, please be more specific.</p>;
    } else if (filtered.length > 1) {
      return filtered.map((c) => <div key={c.cca3}>{c.name.common}</div>);
    } else if (filtered.length === 1) {
      const c = filtered[0];
      return (
        <div style={inlineBox}>
          <h2>{c.name.common}</h2>
          <p><strong>Capital:</strong> {c.capital}</p>
          <p><strong>Area:</strong> {c.area} km²</p>
          <p><strong>Languages:</strong></p>
          <ul>
            {Object.values(c.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={c.flags.png} alt="flag" style={{ width: "150px", border: "1px solid black" }} />
        </div>
      );
    } else {
      return <p>No matches found.</p>;
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Find Country</h1>
      <input
        value={search}
        onChange={handleChange}
        placeholder="Enter country name..."
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "250px" }}
      />
      {renderCountries()}
    </div>
  );
};

export default App;
