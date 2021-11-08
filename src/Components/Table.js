import React from "react";
import "./Table.css";
function Table({ tableData }) {
  return (
    <div className="table">
      {tableData.map(({ country, cases, countryInfo }) => (
        <tr>
          <td>
            <img
              className="table-img"
              src={countryInfo.flag}
              alt="country flag"
            ></img>
            {country}
          </td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
