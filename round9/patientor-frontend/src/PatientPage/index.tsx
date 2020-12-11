import React from "react";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react/"
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const patient = patients[id];

  const fetchPatientInfo = async () => {
    try {
      const { data: patientInfo } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch({ type: "UPDATE_PATIENT", payload: patientInfo });
    } catch (error) {
      console.error(error.message);
    }
  };

  React.useEffect(() => {
    if (!patient || !patient.ssn) {
      fetchPatientInfo();
    }
  }, [id]); // eslint-disable-line

  const getGenderIconName = (gender: string) => {
    switch (gender) {
      case "male":
        return "mars";
      case "other":
        return "genderless";
      default:
        return "venus";
    }
  };

  if (!patient) {
    return null;
  }


  const genderName = getGenderIconName(patient.gender);

  return (<div>
    <h2>{patient.name}
    <Icon name={genderName} />
    </h2>
    <div>ssn: {patient.ssn}</div>
    <div>occupation: {patient.occupation}</div>
  </div>);
};

export default PatientPage;