import diagnosesEntries from '../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const getDiagnosis = (): Diagnosis[] => {
  return diagnosesEntries;
};

export default {
  getDiagnosis,
};