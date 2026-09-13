import { useState } from "react";
import { Diagnosis, NewOccupationalHealthcareEntry } from "../../../../shared/types";
import { Button,FormControl, InputLabel, Select, Stack, TextField, MenuItem } from "@mui/material";

interface props  {
  onSubmit: (entry: NewOccupationalHealthcareEntry) => void;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareForm = ({ onSubmit, diagnoses }: props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const newEntry: NewOccupationalHealthcareEntry = {
      description,
      date,
      specialist,
      employerName,
      type: "OccupationalHealthcare",
      sickLeave: {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate
      }
    };
    onSubmit(newEntry);
  };

  return (
    <form onSubmit={submit}>
      <Stack spacing={2} maxWidth={400}>
      <TextField id="description" label="description" value={description} onChange={({ target }) => setDescription(target.value)}/>
              <FormControl>
                <InputLabel>Diagnosis codes</InputLabel>
                <Select
                  multiple
                  value={diagnosisCodes}
                  id="diagnosisCodes"
                  label="diagnosisCodes"
                  onChange={(event) => setDiagnosisCodes(event.target.value as string[])}
                >
                  {
                    diagnoses.map(diagnosis => (
                      <MenuItem value={diagnosis.code}>{diagnosis.code}-{diagnosis.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
        <TextField id="date" label="Date" type="date" slotProps={{inputLabel: {shrink: true}}} value={date} onChange={({ target }) => setDate(target.value)}/>
        <TextField id="specialist" label="specialist" value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
        <TextField id="employerName" label="employerName" value={employerName} onChange={({ target }) => setEmployerName(target.value)}/>
        <TextField id="sickLeaveStartDate" label="Sick Leave Start Date" type="date" slotProps={{ inputLabel: { shrink: true}}} value={sickLeaveStartDate} onChange={({ target }) => setSickLeaveStartDate(target.value)} />
        <TextField id="sickLeaveEndDate" label="Sick Leave End Date" type="date" slotProps={{ inputLabel: { shrink: true}}} value={sickLeaveEndDate} onChange={({ target }) => setSickLeaveEndDate(target.value)} />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
    
  );
};

export default OccupationalHealthcareForm;