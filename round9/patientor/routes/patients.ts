import express from 'express';
import patientService from '../services/patientService';
import { Entry } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
  const id: string = req.params.id;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry: Entry = req.body;
    const entry = patientService.addEntry(newEntry, id);

    res.json(entry);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  try {
    const patient = patientService.getPatientById(id);
    res.json(patient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.message === "not found") {
      res.status(404).send("not found");
    }
    else {
      res.status(400).send("missing id");
    }
  }
  


});

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const patientEntry = patientService.addPatient(newPatientEntry);

    res.json(patientEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;