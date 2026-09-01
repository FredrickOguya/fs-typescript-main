export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string

}

export const Gender = {
  male: 'male',
  female: 'female',
  other: 'other'
} as const;


export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;
export type NewPatient = Omit<PatientsEntry, 'id'>;
export type Gender = typeof Gender[keyof typeof Gender];