import { Diagnosis, NewHospitalEntry } from "../../../../shared/types";
import { Button, Stack, TextField, MenuItem, FormControl, InputLabel, Select} from "@mui/material";
import { useState } from "react";

interface props {
  onSubmit: (entry: NewHospitalEntry) => void;
  diagnoses: Diagnosis[];
}


const HospitalForm = ({onSubmit, diagnoses }: props) => {

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const submit = (event: React.FormEvent): void => {
    event?.preventDefault();

    const entry: NewHospitalEntry = {
      date,
      description,
      specialist,
      type: "Hospital",
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      }
    };
    onSubmit(entry);
  };
  return (
    <form onSubmit={submit}>
      <Stack spacing={2} maxWidth={400}>
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
        <TextField id="textfield" label="description" value={description} onChange={({target}) => setDescription(target.value)}/>
        <TextField id="date" type="date" label="Date" slotProps={{inputLabel: {shrink: true}}} value={date} onChange={({target}) => setDate(target.value)}/>
        <TextField id="specialist" label="specialist" value={specialist} onChange={({ target }) => setSpecialist(target.value)}/>
        <TextField id="dischargeCriteria" label="discharge criteria" value={dischargeCriteria} onChange={({ target }) => setDischargeCriteria(target.value)}/>
        <TextField id="dischargeDate" type="date" label="dischargeDate" slotProps={{inputLabel: {shrink: true}}} value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)}/>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};

export default HospitalForm;