/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NewPatientEntry, Gender } from './types';

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseText = (text: any, parameterName: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${parameterName}: ${text}`);
  }
  return text;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseText(object.name, 'name'),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseText(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation, 'occupation')
  };
};

export default toNewPatientEntry;