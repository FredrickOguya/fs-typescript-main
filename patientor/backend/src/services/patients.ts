import patientsEntries from '../data/patients.ts';
import type { NonSensitivePatientsEntry, PatientsEntry } from '../types.ts';

const getPatients = (): PatientsEntry[] => {
  return patientsEntries;
};

const getNonSensitivePatientEntry = (): NonSensitivePatientsEntry[] => {
  return patientsEntries.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getNonSensitivePatientEntry
};