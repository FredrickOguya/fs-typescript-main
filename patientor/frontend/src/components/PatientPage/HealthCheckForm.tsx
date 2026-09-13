import { useState } from "react";
import { Diagnosis, HealthCheckRating, NewHealthCheckEntry } from "../../../../shared/types";
import { Button, InputLabel, FormControl, MenuItem, Select, Stack, TextField } from "@mui/material";
interface props {
  onSubmit: (entry: NewHealthCheckEntry) => void;
  diagnoses: Diagnosis[];
}
const HealthCheckForm = ({ onSubmit, diagnoses }: props) => {

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const entry: NewHealthCheckEntry = {
      date,
      description,
      specialist,
      type: "HealthCheck",
      healthCheckRating,
      diagnosisCodes
    };
    onSubmit(entry);

    setDate('');
    setDescription('');
    setHealthCheckRating(0);
    setSpecialist('');
    setDiagnosisCodes([]);
  };


  return <form onSubmit={submit}>
    <Stack spacing={2} maxWidth={400}>
      <TextField id="description" label="description" value={description} onChange={({target}) => setDescription(target.value)} />
      <TextField id="date" value={date} label="Date" slotProps={{inputLabel: {shrink: true}}} type="date" onChange={({target}) => setDate(target.value)}/>
      <TextField id="specialist" label="specialist" value={specialist} onChange={({ target }) => setSpecialist(target.value)}/>
      <FormControl fullWidth>
        <InputLabel id="healthCheckRating">HealthCheck Rating</InputLabel>
        <Select
          id="health-rating"
          value={healthCheckRating}
          label="Health Rating"
          onChange={({ target }) => setHealthCheckRating(target.value)}
          >
            <MenuItem value={0}>0 - Healthy</MenuItem>
            <MenuItem value={1}>1 - Low Risk</MenuItem>
            <MenuItem value={2}>2 - High Risk</MenuItem>
            <MenuItem value={3}>3 - Critical Risk</MenuItem>
          </Select>
      </FormControl>
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
    <Button type="submit">Submit</Button>
    </Stack>
    
  </form>;
};

export default HealthCheckForm;


