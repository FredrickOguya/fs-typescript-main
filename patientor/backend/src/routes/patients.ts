import express from 'express';
import patientServices from '../services/patients.ts';
import parseNewPatientEntry from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientServices.getNonSensitivePatientEntry();
  res.send(data);
});

router.post('/', (req, res) => {
  try{
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedPatient = patientServices.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something Went wrong.';
    if( error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  
});

export default router;