import React from "react";
import { Entry } from "../types";

const EntryInfo: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <div>
        {entry.date} {entry.description}
      </div>
      <div>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((code) => <p key={code}>code: {code}</p>)}
      </div>
    </div>
  );
};

export default EntryInfo;