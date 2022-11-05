import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import Diagnoses from "./Diagnoses";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";
import CardHeader from "@mui/material/CardHeader";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

const OccupationalHealthEntryCard = ({
  entry
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Card
      elevation={12}
      sx={{ width: 290, minHeight: "-webkit-fill-available" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey["A400"] }} aria-label="recipe">
            <MedicalInformationIcon />
          </Avatar>
        }
        title={entry.date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {entry.employerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {entry.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"div"}>
          <Diagnoses codes={entry.diagnosisCodes} />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sick Date start:{entry.sickLeave?.startDate || "NO"}, end:
          {entry.sickLeave?.endDate || "NO"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          diagnose by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default OccupationalHealthEntryCard;
