/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from "react";
import axios from "axios";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react/";
import { useParams } from "react-router-dom";
import { addEntry, updatePatient, useStateValue } from "../state";
import EntryInfo from "../components/EntryInfo";
import AddEntryForm, { EntryFormValues } from "../AddPatientModal/AddEntryForm";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [visibleForm, setVisibleForm] = useState<boolean>(false);

  const patient = patients[id];

  const fetchPatientInfo = async () => {
    try {
      const { data: patientInfo } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(patientInfo));
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

  if (!patient || !patient.entries) {
    return null;
  }

  const onSubmit = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
    } catch (error) {
      console.error(error.message);
    }
  };


  const genderName = getGenderIconName(patient.gender);

  return (<div>
    <h2>{patient.name}
    <Icon name={genderName} />
    </h2>
    <div>ssn: {patient.ssn}</div>
    <div>occupation: {patient.occupation}</div>
    <h3>entries</h3>
    {patient.entries.map((entry) => (<EntryInfo key={entry.id} entry={entry} />))}
    
    {visibleForm ? <AddEntryForm onSubmit={onSubmit} onCancel={() => setVisibleForm(false)} /> :
    <button onClick={() => setVisibleForm(true)}>add entry</button>}
  </div>);
};

export default PatientPage;