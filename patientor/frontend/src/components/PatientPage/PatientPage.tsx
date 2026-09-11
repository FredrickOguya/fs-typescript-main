import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider
} from "@mui/material";

import { Diagnosis, NewHealthCheckEntry, Patient } from "../../../../shared/types";
import { Female, Male } from "@mui/icons-material";
import EntryDetails from "./EntryDetails";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import patientService from '../../services/patients';
import HealthCheckForm from "../HealthCheckForm";

interface Props {
  patient: Patient | null | undefined;
  diagnoses: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientPage = ({ patient, diagnoses, setPatients }: Props) => {
  if (!patient) {
    return (
      <Typography variant="h6">
        Patient not found
      </Typography>
    );
  }

  const submitNewEntry = async (entry: NewHealthCheckEntry) => {
    const newEntry = await patientService.addEntry(patient.id, entry);
    setPatients(currentPatients =>
    currentPatients.map(p =>
      p.id === patient.id
        ? { ...p, entries: [...p.entries, newEntry] }
        : p
    )
);

  };

  return (
    <Card sx={{ marginTop: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {patient.name}  {patient.gender === "male" && <Male/> } {patient.gender === "female" && <Female />}
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        <Stack spacing={2}>
          <Typography>
            <strong>ssn: </strong> {patient.ssn}
          </Typography>

            
          <Typography>
            <strong>Occupation:</strong> {patient.occupation}
          </Typography>

          <Typography>
            <strong>Date of Birth:</strong> {patient.dateOfBirth}
          </Typography>
          
          {patient.gender === "other" &&
          <Typography>
            <strong>Gender:</strong> {patient.gender}
          </Typography>
          }

          <Typography>
            <strong>Entries: </strong>
          </Typography>
            {
              patient.entries.map(e => (
                <div key={e.id}>
                  <Typography>
                    {e.date} <MedicalServicesIcon /> <br />{e.description}
                  </Typography>

                  <EntryDetails entry={e} />

                  <ul>
                    {e.diagnosisCodes?.map(code => {
                    const diagnosis = diagnoses.find(d => d.code === code);

                      return (
                    <li key={code}>{code} {diagnosis?.name}</li>
                    );
                    })}
                  </ul>
                </div>
                
              ))
            }
        </Stack>
        <HealthCheckForm onSubmit={submitNewEntry}/>
      </CardContent>
    </Card>
  );
};

export default PatientPage;
