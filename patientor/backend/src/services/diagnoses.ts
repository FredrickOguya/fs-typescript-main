import diagnosesEntries from '../data/diagnoses.ts';
import type { Diagnosis } from '../../../shared/types.ts';

const getDiagnosis = (): Diagnosis[] => {
  return diagnosesEntries as Diagnosis[];
};

export default {
  getDiagnosis,
};