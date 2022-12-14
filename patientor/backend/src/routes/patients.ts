import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getAll());
});

router.post('/', (req, res) => {
    try {
        // check if the comming obj is valid and make type assignments
        const newPatient = toNewPatient(req.body);
        // if no errors thrown, send it to service
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        res.send(patientService.getPatient(id));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const patient = patientService.getPatient(id);
        // check if the comming obj is valid and make type assignments
        const newEntryFromClient = toNewEntry(req.body);
        const addedEntry = patientService.addEntryToPatient(
            patient,
            newEntryFromClient
        );
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
