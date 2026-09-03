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
  occupation: z.string()
});

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;
export type NewPatient = Omit<PatientsEntry, 'id'>;
export type Gender = typeof Gender[keyof typeof Gender];
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export interface PatientsEntry extends NewPatientEntry {
  id: string;
}