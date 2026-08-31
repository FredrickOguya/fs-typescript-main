import express from "express";
import diagnosesRouter from './routes/diagnoses.ts';
import patientsRouter from './routes/patients.ts';
import cors from 'cors';

const app = express();

const PORT = 3001;

app.use(cors());
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});