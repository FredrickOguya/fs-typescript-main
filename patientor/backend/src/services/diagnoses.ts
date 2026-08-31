import diagnosesEntries from '../data/diagnoses.ts'
import type { DiagnosesEntry } from '../types.ts'

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnosesEntries;
}

export default {
  getDiagnoses,
}