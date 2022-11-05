import React from "react";
import Diagnoses from "./Diagnoses";
import { Entry } from "../types";

interface EntriesProps {
  entries?: Entry[];
}

const SingleEntry = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <p>
        {entry.date} {entry.description}
      </p>
      <Diagnoses codes={entry.diagnosisCodes} />
    </div>
  );
};

const Entries = ({ entries }: EntriesProps) => {
  if (!entries) return null;

  return (
    <div>
      <h4>entries</h4>
      {entries.map((entry) => (
        <SingleEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default Entries;
