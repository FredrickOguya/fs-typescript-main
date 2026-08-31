export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string

}

type Gender = 'male' | 'female' | 'other';

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;