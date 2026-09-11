import { useState } from "react";
import { HealthCheckRating, NewHealthCheckEntry } from "../../../../shared/types";
import { Button, Stack, TextField } from "@mui/material";
interface props {
  onSubmit: (entry: NewHealthCheckEntry) => void;
}
const HealthCheckForm = ({ onSubmit }: props) => {

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const entry: NewHealthCheckEntry = {
      date,
      description,
      specialist,
      type: "HealthCheck",
      healthCheckRating,
    };
    onSubmit(entry);

    setDate('');
    setDescription('');
    setHealthCheckRating(0);
    setSpecialist('');
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (value === 0 || value === 1 || value === 2 || value === 3 ) {
      setHealthCheckRating(value);
    }
  };

  return <form onSubmit={submit}>
    <Stack spacing={2} maxWidth={400}>
      <TextField id="description" label="description" value={description} onChange={({target}) => setDescription(target.value)} />
      <TextField id="date" value={date} label="Date" slotProps={{inputLabel: {shrink: true}}} type="date" onChange={({target}) => setDate(target.value)}/>
      <TextField id="specialist" label="specialist" value={specialist} onChange={({ target }) => setSpecialist(target.value)}/>
      <TextField id="healthCheckRating" label="healthCheckRating" value={healthCheckRating} onChange={handleRatingChange}/>
    <Button type="submit">Submit</Button>
    </Stack>
    
  </form>;
};

export default HealthCheckForm;


