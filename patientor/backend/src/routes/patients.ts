
import express, { type Request, type Response, type NextFunction} from 'express';
import patientServices from '../services/patients.ts';
import { type Patient } from '../../../shared/types.ts';
import { NewEntrySchema, NewPatientSchema, type NewPatientEntry,type NewEntry } from '../types.ts';


const router = express.Router();
 
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction, ) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get('/', (_req, res) => {
  const data = patientServices.getPatients();
  res.send(data);
});

router.get('/:id', (req,res) => {
  const id = req.params.id;
  const patient = patientServices.getById(id);
  res.send(patient);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = patientServices.addPatient(req.body);
  res.json(addedEntry);
  
});

router.post("/:id/entries",newEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response) => {

  const newEntry = patientServices.addEntry(
    req.params.id,
    req.body
  );
  res.status(201).json(newEntry);

});

export default router;