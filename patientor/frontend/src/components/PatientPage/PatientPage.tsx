import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import {
  Diagnosis,
  Entry,
  NewEntry,
  Patient
} from "../../../../shared/types";
import { Female, Male } from "@mui/icons-material";
import EntryDetails from "./EntryDetails";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import patientService from '../../services/patients';
import HealthCheckForm from "./HealthCheckForm";
import { useState } from "react";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthCareForm";

interface Props {
  patient: Patient | null | undefined;
  diagnoses: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientPage = ({ patient, diagnoses, setPatients }: Props) => {
  const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");
  if (!patient) {
    return (
      <Typography variant="h6">
        Patient not found
      </Typography>
    );
  }

  const submitNewEntry = async (
    entry: NewEntry
  ) => {
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

        <FormControl fullWidth sx={{mb: 4}}>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            id="type-select"
            value={entryType}
            label="Type"
            onChange={({target}) => setEntryType(target.value)}
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">OccupationalHealthCare</MenuItem>
          </Select>
        </FormControl>
        { entryType === "HealthCheck" && <HealthCheckForm onSubmit={ submitNewEntry}/> } 
        { entryType === "Hospital" && <HospitalForm onSubmit={ submitNewEntry}/> } 
        { entryType === "OccupationalHealthcare" && <OccupationalHealthcareForm onSubmit={submitNewEntry}/> }
       
      </CardContent>
    </Card>
  );
};

export default PatientPage;
