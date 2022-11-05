import React from "react";
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
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
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
