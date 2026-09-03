
import express, { type Request, type Response, type NextFunction} from 'express';
import patientServices from '../services/patients.ts';
import { NewPatientSchema, type NewPatientEntry, type PatientsEntry } from '../types.ts';

const router = express.Router();
 
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
router.get('/', (_req, res) => {
  const data = patientServices.getNonSensitivePatientEntry();
  res.send(data);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientsEntry>) => {
  const addedEntry = patientServices.addPatient(req.body);
  res.json(addedEntry);
  
});

export default router;