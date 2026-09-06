import diagnosesEntries from '../../data/diagnoses.ts';
import type { Diagnosis } from '../../../shared/types.ts';

const getDiagnosis = (): Diagnosis[] => {
  return diagnosesEntries;
};

export default {
  getDiagnosis,
};