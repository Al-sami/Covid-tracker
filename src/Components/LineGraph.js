import React, { useState, useEffect } from "react";
import numeral from "numeral";
import { Line } from "react-chartjs-2";

const buildChartData = (data, caseType = "cases") => {
  const ChartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[caseType][date] - lastDataPoint,
      };
      ChartData.push(newDataPoint);
    }
    lastDataPoint = data[caseType][date];
  }
  return ChartData;
};

function LineGraph({ caseType = "cases" }) {
  const [data, setData] = useState({});

  const options = {
    plugins: {
      legend: {
        display: false,
      },

      elements: {
        point: {
          radius: 0,
        },
      },
      maintainAspectRatio: true,
      tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            return numeral(tooltipItem.value).format("+0,0");
          },
        },
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              format: "MM/DD/YY",
              tooltipFormat: "ll",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return numeral(value).format("0a");
              },
            },
          },
        ],
      },
    },
  };

  useEffect(() => {
    const gettingChartData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all")
        .then((response) => response.json())
        .then((data) => {
          setData(buildChartData(data, "cases"));
        });
    };

    gettingChartData();
  }, [caseType]);
  return (
    <div>
      <h1>I am graph</h1>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,52,16,0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
