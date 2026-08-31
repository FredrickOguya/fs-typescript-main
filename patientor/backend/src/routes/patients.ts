import express from 'express';
import patientServices from '../services/patients.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientServices.getNonSensitivePatientEntry();
  res.send(data);
});

export default router;