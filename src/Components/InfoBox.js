import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./InfoBox.css";
function InfoBox({ title, cases, active, isRed, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox_cases ${!isRed && "infoBox_cases--green"}`}>
          {cases ? cases : `+0`}
        </h2>

        <Typography className="infoBox_total" color="textSecondary">
          {total ? total : `+0`} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
