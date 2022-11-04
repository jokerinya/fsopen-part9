import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';

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
const addPatient = (entry: NewPatient): Patient => {
    const id: string = uuid();
    const newEntry = {
        id,
        ...entry,
    };
    patients.push(newEntry);
    return newEntry;
};

const getPatient = (id: string): Patient => {
    const patient = patients.find((p) => p.id === id);
    if (!patient) {
        throw new Error('There is no user with this id.');
    }
    return patient;
};

export default {
    getAll,
    addPatient,
    getPatient,
};
