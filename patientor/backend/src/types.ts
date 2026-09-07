import z from 'zod';
import { HealthCheckRating,Gender } from '../../shared/types.ts';


const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const HealthCheckRatingSchema = z.union([
  z.literal(HealthCheckRating.Healthy),
  z.literal(HealthCheckRating.LowRisk),
  z.literal(HealthCheckRating.HighRisk),
  z.literal(HealthCheckRating.CriticalRisk)
]);

const HealthCheckEntrySchema = BaseEntrySchema.extend({

  type: z.literal("HealthCheck"),

  healthCheckRating: HealthCheckRatingSchema

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

export const NewEntrySchema = z.discriminatedUnion("type", [
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
  entries: z.array(NewEntrySchema)
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;