import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

import { Patient } from "../types";

interface Props {
  patient: Patient | null | undefined;
}

const PatientPage = ({ patient }: Props) => {
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
          {patient.name}
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        <Stack spacing={2}>
          <Typography>
            <strong>Date of Birth:</strong> {patient.dateOfBirth}
          </Typography>

          <Typography>
            <strong>Gender:</strong> {patient.gender}
          </Typography>

          <Typography>
            <strong>Occupation:</strong> {patient.occupation}
          </Typography>

        </Stack>
      </CardContent>
    </Card>
  );
};

export default PatientPage;
