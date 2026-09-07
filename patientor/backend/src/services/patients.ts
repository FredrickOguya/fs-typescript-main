import { v1 } from 'uuid';
import patientsData from '../../data/patients.ts';
import type { Entry, NonSensitivePatient, Patient } from '../../../shared/types.ts';
import type { NewEntry, NewPatientEntry } from '../types.ts';

const patients = patientsData;

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

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    ...entry,
    id: v1(),
    entries: entry.entries.map((newEntry) => ({
      ...newEntry,
      id: v1()
    }))
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id == patientId);

  if(!patient) {
    throw new Error('Patient is not available');
  }

  const newEntry: Entry = { ...entry,
    id: v1()
  };

  patient.entries.push(newEntry);

  return newEntry;
};


export default {
  getPatients,
  getNonSensitivePatientEntry,
  addPatient,
  getById,
  addEntry
};

