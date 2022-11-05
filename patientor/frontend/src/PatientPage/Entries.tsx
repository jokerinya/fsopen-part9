import React from "react";
import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntryCard";
import OccupationalHealthEntry from "./OccupationalHealthEntryCard";
import HospitalEnry from "./HospitalEntryCard";
import Grid from "@mui/material/Grid";

interface EntriesProps {
  entries?: Entry[];
}

const SingleEntry = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthEntry entry={entry} />;
    case "Hospital":
      return <HospitalEnry entry={entry} />;
    default:
      return null;
  }
};

const Entries = ({ entries }: EntriesProps) => {
  if (!entries) return null;

  return (
    <div>
      <h4>entries</h4>
      <Grid container padding={3} rowSpacing={2}>
        {entries.map((entry) => (
          <Grid
            key={entry.id}
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <SingleEntry entry={entry} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Entries;
