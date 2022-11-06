export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    type: EntryType;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

export enum EntryType {
    HealthCheck = 'HealthCheck',
    OccupationalHealthcare = 'OccupationalHealthcare',
    Hospital = 'Hospital',
}

interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: Discharge;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
    ? Omit<T, K>
    : never;

export type NewEntry = DistributiveOmit<Entry, 'id'>;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
