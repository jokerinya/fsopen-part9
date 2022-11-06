import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';

const getAll = (): Array<PublicPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

// accepts NewPatient entry and add id returns Patient type obj
const addPatient = (patient: NewPatient): Patient => {
    const id: string = uuid();
    const newPatient = {
        id,
        ...patient,
    };
    patients.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patient => {
    const patient = patients.find((p) => p.id === id);
    if (!patient) {
        throw new Error('There is no user with this id.');
    }
    return patient;
};

const addEntryToPatient = (patient: Patient, newEntry: NewEntry): Entry => {
    const id: string = uuid();
    const newEntryToAdd = {
        id,
        ...newEntry,
    };
    patient.entries.push(newEntryToAdd);
    return newEntryToAdd;
};

export default {
    getAll,
    addPatient,
    getPatient,
    addEntryToPatient,
};
