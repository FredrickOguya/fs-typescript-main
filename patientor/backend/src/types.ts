import z from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string

}




export const Gender = {
  male: 'male',
  female: 'female',
  other: 'other'
} as const;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code'][]>;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

type SickLeave = {
  startDate: string,
  endDate: string
};

type Discharge = {
  date: string,
  criteria: string
};

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthEntry',
  employerName: string,
  sickLeave: SickLeave
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: Discharge
}

export type Entry = | OccupationalHealthcareEntry| HospitalEntry| HealthCheckEntry;


const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});


const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
  ]),
});

const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});
const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

const SickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});


const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema
]);

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema)
});

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;
export type Gender = typeof Gender[keyof typeof Gender];
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatientEntry {
  id: string;
}

