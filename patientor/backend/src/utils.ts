import {
    Diagnose,
    Discharge,
    EntryType,
    Gender,
    HealthCheckRating,
    NewBaseEntry,
    NewEntry,
    NewPatient,
    SickLeave,
} from './types';

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

// const a = "I'm a string primitive";
// const b = new String("I'm a String Object");
// typeof a; --> returns 'string'
// typeof b; --> returns 'object'
// a instanceof String; --> returns false
// b instanceof String; --> returns true
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (name: unknown, msg: string): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing ${msg}`);
    }
    return name;
};

// we check it after being sure that it is string
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown, msg: string): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${msg}`);
    }
    return date;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

// This will accepts any type of object
// validate it as NewPatient type which is Patient without id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(object.name, 'name'),
        dateOfBirth: parseDate(object.dateOfBirth, 'date of birth'),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation, 'occupation'),
        entries: [],
    };
    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type: any): type is EntryType => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(EntryType).includes(type);
};

const parseEntryType = (type: unknown): EntryType => {
    if (!type || !isEntryType(type)) {
        throw new Error('Incorrect or missing entry type');
    }
    return type;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};

const isArrayConsistsOfStrings = (codes: unknown[]): codes is string[] => {
    const res = codes.every((code) => isString(code));
    return res;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnose['code']> => {
    if (!Array.isArray(codes) || !isArrayConsistsOfStrings(codes)) {
        throw new Error('Incorrect or type of diagnosis codes');
    }
    return codes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewBaseEntry = (object: any): NewBaseEntry => {
    const newBaseEntry: NewBaseEntry = {
        type: parseEntryType(object.type),
        description: parseDescription(object.description),
        date: parseDate(object.date, 'date of entry'),
        specialist: parseSpecialist(object.specialist),
    };
    if (object.diagnosisCodes) {
        console.log(object.diagnosisCodes);
        newBaseEntry.diagnosisCodes = parseDiagnosisCodes(
            object.diagnosisCodes
        );
    }
    return newBaseEntry;
};

/**
 * This solution is required for where enum values are integers.
 * enums behaves differently from expected
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRatingType = (rating: any): rating is HealthCheckRating => {
    const ratingValuesArr: number[] = [];
    for (const key in HealthCheckRating) {
        const element = HealthCheckRating[key];
        if (typeof element === 'number') {
            ratingValuesArr.push(element);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(ratingValuesArr).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (rating === undefined || !isHealthCheckRatingType(rating)) {
        throw new Error('Incorrect or missing health checking rating');
    }
    return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (object: any): Discharge => {
    if (!object) {
        throw new Error('Discharge is missing');
    }
    return {
        date: parseDate(object.date, 'discharge date.'),
        criteria: parseString(object.criteria, 'discharge criteria.'),
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (object: any): SickLeave => {
    if (!object) {
        throw new Error('Sick leave is missing');
    }
    return {
        startDate: parseDate(object.startDate, 'sick leave start date.'),
        endDate: parseDate(object.endDate, 'sick leave end date'),
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
    const newEntry = toNewBaseEntry(object) as NewEntry;
    switch (newEntry.type) {
        case EntryType.HealthCheck:
            return {
                ...newEntry,
                healthCheckRating: parseHealthCheckRating(
                    object.healthCheckRating
                ),
            };
        case EntryType.Hospital:
            return {
                ...newEntry,
                discharge: parseDischarge(object.discharge),
            };
        case EntryType.OccupationalHealthcare:
            if (object.sickLeave) {
                newEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            return {
                ...newEntry,
                employerName: parseString(
                    object.employerName,
                    'employer name.'
                ),
            };
        default:
            return newEntry;
    }
};
