import type { NewPatient, NonSensitivePatientsEntry, PatientsEntry } from '../types.ts';
import { v1 } from 'uuid';
import patientsData from '../data/patients.ts';

const patients: PatientsEntry[] = patientsData;

const getPatients = (): PatientsEntry[] => {
  return patients;
};


const getNonSensitivePatientEntry = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): PatientsEntry => {
  const newPatientEntry: PatientsEntry = {
    ...entry,
    id: v1()
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatientEntry,
  addPatient
};

