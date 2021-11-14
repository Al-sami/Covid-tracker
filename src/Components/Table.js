import React from "react";
import "./Table.css";
function Table({ tableData }) {
  return (
    <div className="table">
      {tableData.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
