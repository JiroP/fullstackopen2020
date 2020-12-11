import React from "react";
import { useStateValue } from "../state";
import { HospitalEntry as Entry } from "../types"; 

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{diagnosis}] = useStateValue();

  return (
    <div>
      <div>
        {entry.date} {entry.description}
      </div>
      <div>
        discharged on {entry.discharge.date} by basis {entry.discharge.criteria}
      </div>
      <div>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((code) => <p key={code}>code: {code} {diagnosis[code].name}</p>)}
      </div>
    </div>
  );
};

export default HospitalEntry;