import React from "react";
import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthCareEntry from "./OccupationalHealthCareEntry";

const EntryInfo: React.FC<{ entry: Entry }> = ({ entry }) => {

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntry entry={entry} />;
  }
};

export default EntryInfo;