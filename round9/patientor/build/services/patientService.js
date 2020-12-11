"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../data/patients.json"));
const uuid_1 = require("uuid");
const patients = patients_json_1.default;
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};
const addPatient = (patient) => {
    const id = uuid_1.v4();
    const patientEntry = Object.assign({ id, entries: [] }, patient);
    patients.push(patientEntry);
    return patientEntry;
};
const getPatientById = (id) => {
    if (!id) {
        throw new Error('empty id');
    }
    const patient = patients.find((p) => p.id === id);
    if (!patient) {
        throw new Error('not found');
    }
    return patient;
};
exports.default = {
    getNonSensitiveEntries,
    addPatient,
    getPatientById
};
