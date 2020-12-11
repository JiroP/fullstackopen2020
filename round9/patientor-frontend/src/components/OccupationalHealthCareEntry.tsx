import React from "react";
import { useStateValue } from "../state";
import { OccupationalHealthcareEntry as Entry } from "../types"; 

const OccupationalHealthCareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{diagnosis}] = useStateValue();
  return (
    <div>
      <div>
        {entry.date} {entry.description}
      </div>
      <div>
        Employer {entry.employerName}
      </div>
      <div>
        {entry.sickLeave && `Sick leave from: ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`}
      </div>
      <div>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((code) => <p key={code}>code: {code} {diagnosis[code].name}</p>)}
      </div>
    </div>
  );
};

export default OccupationalHealthCareEntry;