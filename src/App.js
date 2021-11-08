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
import Table from "./Components/Table";
import { sortedData } from "./util";
import "./App.css";
//https://disease.sh/v3/covid-19/countries
function App() {
  const [countries, setCountries] = useState([]);
  const [countryClicked, setCountryClicked] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
          setCountryData(sortedData(data));
        });
    getCountriesInfo();
  }, []);

  async function handleCountryChange(event) {
    const newCountry = event.target.value;

    const url =
      newCountry === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${newCountry}`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountryClicked(newCountry);
        setCountryInfo(data);
        console.log(data);
      });

    //  if worldwide then link https://disease.sh/v3/covid-19/all
    // else if any country https://disease.sh/v3/covid-19/countries/{country}
  }

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 Tracker</h1>

          <FormControl className="app_dropdown">
            <Select value={countryClicked} onChange={handleCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map />
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by country</h3>
          <Table tableData={countryData} />
          {/* Graph */}
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
