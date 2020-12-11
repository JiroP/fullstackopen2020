import React from "react";
import { useStateValue } from "../state";
import { HealthCheckEntry as Entry } from "../types"; 

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{diagnosis}] = useStateValue();

  const healthCheckStrings = [
    "Healthy",
    "LowRisk",
    "HighRisk",
    "CriticalRisk",
  ];

  return (
    <div>
      <div>
        {entry.date} {entry.description}
      </div>
      <div>
        Health status: {healthCheckStrings[entry.healthCheckRating]}
      </div>
      <div>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((code) => <p key={code}>code: {code} {diagnosis[code].name}</p>)}
      </div>
    </div>
  );
};

export default HealthCheckEntry;