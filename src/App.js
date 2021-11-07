import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import "./App.css";
//https://disease.sh/v3/covid-19/countries
function App() {
  const [countries, setCountries] = useState([]);
  const [countryClicked, setCountryClicked] = useState("worldwide");

  useEffect(() => {
    const getCountriesInfo = async () =>
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2,
            };
          });
          setCountries(countries);
        });
    getCountriesInfo();
  }, []);

  function handleCountryChange(event) {
    const newCountry = event.target.value;
    console.log(newCountry);
    setCountryClicked(newCountry);
  }

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 Tracker</h1>

          <FormControl className="app_dropdown">
            <Select
              value={countryClicked}
              variant="outlined"
              onChange={handleCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox title="Coronavirus Cases" cases="123" total="2000" />
          <InfoBox title="Recovered" cases="123" total="2002" />
          <InfoBox title="Deaths" cases="1234" total="2001" />
        </div>
        <Map />
      </div>

      <Card className="app_right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by country</h3>
          {/* Graph */}
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;