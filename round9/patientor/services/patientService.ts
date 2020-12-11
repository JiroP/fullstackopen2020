/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import patientData from '../data/patients';
import { v4 as uuid } from 'uuid';
import {parseText} from '../utils';

import { Patient, NonSensitivePatient, NewPatientEntry, Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, Discharge, OccupationalHealthcareEntry, SickLeave } from '../types';

const patients: Patient[] = patientData;

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => (
      { id, name, dateOfBirth, gender, occupation }
    ));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const id: string = uuid();
  const patientEntry: Patient = { id, entries: [],...patient };

  patients.push(patientEntry);
  return patientEntry;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (param: any): HealthCheckRating => {
  if (param && isHealthCheckRating(param)) {
    return param;
  }
  throw new Error('malformatted parameters');
};

const parseDischarge = (param: any): Discharge => {
  if (param && param.date && param.criteria) {
    const discharge: Discharge = {
      date: parseText(param.date, 'date'),
      criteria: parseText(param.criteria, 'crit')
    };
    return discharge;
  }
  throw new Error('malformatted parameters');
};

const parseSickLeave = (param: any): SickLeave => {
  if (param && param.startDate && param.endDate) {
    const sickLeave: SickLeave = {
      startDate: parseText(param.startDate, 'start'),
      endDate: parseText(param.endDate, 'end')
    };
    return sickLeave;
  }
  throw new Error('malformatted parameters');
};

const addEntry = (entry: Entry, patientId: string): Entry => {
  if (!entry || !entry.type) {
    throw new Error('malformatted parameters');
  }
  
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error('patient missing');
  }

  switch(entry.type) {
    case "HealthCheck":
      const healthEntry: HealthCheckEntry = {
        id: uuid(),
        type: entry.type,
        description: parseText(entry.description, 'desc'),
        specialist: parseText(entry.specialist, 'spec'),
        date: parseText(entry.date, 'date'),
        diagnosisCodes: entry.diagnosisCodes,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
      patient.entries.push(healthEntry);

      return healthEntry;
    case "Hospital":
      const hospitalEntry: HospitalEntry = {
        id: uuid(),
        type: entry.type,
        description: parseText(entry.description, 'desc'),
        specialist: parseText(entry.specialist, 'spec'),
        date: parseText(entry.date, 'date'),
        diagnosisCodes: entry.diagnosisCodes,
        discharge: parseDischarge(entry.discharge)
      };
      patient.entries.push(hospitalEntry);

      return hospitalEntry;
    case "OccupationalHealthcare":
      const occupEntry: OccupationalHealthcareEntry = {
        id: uuid(),
        type: entry.type,
        description: parseText(entry.description, 'desc'),
        specialist: parseText(entry.specialist, 'spec'),
        date: parseText(entry.date, 'date'),
        diagnosisCodes: entry.diagnosisCodes,
        employerName: parseText(entry.employerName, 'emp'),
        sickLeave: parseSickLeave(entry.sickLeave)
      };
      patient.entries.push(occupEntry);

      return occupEntry;
  }
};

const getPatientById = (id: string): Patient => {
  if (!id) {
    throw new Error('empty id');
  }
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error('not found');
  }
  return patient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getPatientById,
  addEntry
};