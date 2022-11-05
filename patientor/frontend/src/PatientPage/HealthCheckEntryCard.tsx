import React from "react";

import { HealthCheckEntry } from "../types";
import Diagnoses from "./Diagnoses";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";
import CardHeader from "@mui/material/CardHeader";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import HealthCheckRatingIcon from "./HealthCheckRatingIcon";

const HealthCheckEntryCard = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Card
      elevation={12}
      sx={{ width: 290, minHeight: "-webkit-fill-available" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey["A400"] }} aria-label="recipe">
            <MonitorHeartIcon />
          </Avatar>
        }
        title={entry.date}
      />
      <CardContent>
        <Typography gutterBottom component={"div"}>
          <HealthCheckRatingIcon rating={entry.healthCheckRating} />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {entry.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"div"}>
          <Diagnoses codes={entry.diagnosisCodes} />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          diagnose by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryCard;
