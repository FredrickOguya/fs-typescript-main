import z from "zod";

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



export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(z.string())
});

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;
export type Gender = typeof Gender[keyof typeof Gender];
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatientEntry {
  id: string;
}