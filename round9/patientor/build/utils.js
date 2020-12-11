"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
const types_1 = require("./types");
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};
const parseText = (text, parameterName) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${parameterName}: ${text}`);
    }
    return text;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object) => {
    return {
        name: parseText(object.name, 'name'),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseText(object.ssn, 'ssn'),
        gender: parseGender(object.gender),
        occupation: parseText(object.occupation, 'occupation')
    };
};
exports.default = toNewPatientEntry;
