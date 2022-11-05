import React from "react";

import { HospitalEntry } from "../types";
import Diagnoses from "./Diagnoses";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";
import CardHeader from "@mui/material/CardHeader";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntryCard = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Card
      elevation={12}
      sx={{ width: 290, minHeight: "-webkit-fill-available" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey["A400"] }} aria-label="recipe">
            <LocalHospitalIcon />
          </Avatar>
        }
        title={entry.date}
      />
      <CardContent>
        <Typography gutterBottom>{entry.discharge.criteria}</Typography>
        <Typography variant="body2" color="text.secondary">
          {entry.discharge.date}
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
export default HospitalEntryCard;
