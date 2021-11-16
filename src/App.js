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
import LineGraph from "./Components/LineGraph";
import { prettyPrintData, sortedData } from "./util";
// import "leaflet/dist/leaflet.css";

import "./App.css";
function App() {
  const [countries, setCountries] = useState([]);
  const [countryClicked, setCountryClicked] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countryData, setCountryData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4096]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCirlcle, setMapCircle] = useState([]);
  const [casesType, setCasesType] = useState("cases");

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
          setMapCircle(data);
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
        if (event.target.value === "worldwide") {
          setMapCenter([34.80746, -40.4096]);
          setMapZoom(3);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }

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
            isRed
            active={casesType === "cases"}
            title="Coronavirus Cases"
            onClick={(e) => setCasesType("cases")}
            cases={prettyPrintData(countryInfo.todayCases)}
            total={prettyPrintData(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintData(countryInfo.todayRecovered)}
            total={prettyPrintData(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintData(countryInfo.todayDeaths)}
            total={prettyPrintData(countryInfo.deaths)}
          />
        </div>
        <Map
          casestype={casesType}
          countries={mapCirlcle}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by country</h3>
          <Table tableData={countryData} />
          <h3 className="appGraph_header">Worldwide new {casesType}</h3>
          <LineGraph className="app_graph" caseType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
