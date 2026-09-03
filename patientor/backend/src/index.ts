import express, { type NextFunction } from "express";
import diagnosesRouter from './routes/diagnoses.ts';
import patientsRouter from './routes/patients.ts';
import cors from 'cors';
import z from "zod";

const app = express();
app.use(express.json());


app.use(cors());
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues});
    return;
  }
  next(error);
});

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});