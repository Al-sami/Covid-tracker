import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColor = {
  cases: {
    hex: "#CC1034",
    multiplier: 8000,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 12000,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 20000,
  },
};

export const sortedData = (data) => {
  const sortData = [...data];
  return sortData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintData = (num) =>
  num ? `+${numeral(num).format("0.0a")}` : null;

export const showCircleOnMap = (data, casestype = "cases") => {
  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        color: casesTypeColor[casestype].hex,
        fillColor: casesTypeColor[casestype].hex,
      }}
      radius={Math.sqrt(
        country[casestype] * casesTypeColor[casestype].multiplier
      )}
    >
      <Popup>
        <div className="info-cointainer">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-cases">
            Cases:{numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered:{numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths:{numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};
