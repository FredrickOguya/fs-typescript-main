import type { NewPatient, NonSensitivePatient, Patient } from '../types.ts';
import { v1 } from 'uuid';
import patientsData from '../data/patients.ts';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};


const getNonSensitivePatientEntry = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getById = (id: string): NonSensitivePatient => {
  const searchedPatient =  patients.find((p) => p.id === id);
  if(!searchedPatient) {
    throw new Error('Patient is not available');
  } else {
    return searchedPatient;
  }
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    ...entry,
    id: v1()
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatientEntry,
  addPatient,
  getById
};

