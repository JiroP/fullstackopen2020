import patientData from '../data/patients.json';
import { v4 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatientEntry} from '../types';

const patients: Patient[] = patientData as Patient[];

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => (
      { id, name, dateOfBirth, gender, occupation }
    ));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const id: string = uuid();
  const patientEntry: Patient = { id, ...patient };

  patients.push(patientEntry);
  return patientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient
};