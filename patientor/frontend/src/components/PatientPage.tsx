import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider
} from "@mui/material";

import { Diagnosis, Patient } from "../../../shared/types";
import { Female, Male } from "@mui/icons-material";

interface Props {
  patient: Patient | null | undefined;
  diagnoses: Diagnosis[];
}

const PatientPage = ({ patient, diagnoses }: Props) => {
  if (!patient) {
    return (
      <Typography variant="h6">
        Patient not found
      </Typography>
    );
  }

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
                    {e.date} {e.description}
                  </Typography>
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
      </CardContent>
    </Card>
  );
};

export default PatientPage;
