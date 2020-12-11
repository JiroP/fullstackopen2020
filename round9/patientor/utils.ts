/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NewPatientEntry, Gender} from './types';

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const parseText = (text: any, parameterName: string): string => {
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

// const typeIsEntry = (param: any): param is EntryTypes => {
//   return Object.values(EntryTypes).includes(param);
// };

// const typeIsLegit = (type: any): EntryTypes => {
//   // if (type === 'HealthCheck' || type === 'Hospital' || type === 'OccupationalHealthcare') {
//   if (!type && typeIsEntry(type)) {
//     return type;
//   }
//   throw new Error('malformatted type');
// };

// const toNewEntry = (object: any): NewEntry => {
//   if (!object || !object.type) {
//     throw new Error('malformatted parameters');
//   }
//   switch (object.type) {
//     case "OccupationalHealthcare":
//       return {
//         type: typeIsLegit(object.type),
//         description: parseText(object.description, 'description'),
//         date: parseDateOfBirth(object.date),
//         specialist: parseText(object.specialist, 'specialist'),
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//         diagnosisCodes: object.diagnosisCodes
//       };
//     case "HealthCheck":
//       return {
//         type: typeIsLegit(object.type),
//         description: parseText(obje)
//       }
//     case "Hospital":

//     default:
//       throw new Error('Unsupported type');
//   }
// }

export default toNewPatientEntry;