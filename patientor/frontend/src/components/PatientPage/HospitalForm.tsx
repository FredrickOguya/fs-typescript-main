import { NewHospitalEntry } from "../../../../shared/types";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface props {
  onSubmit: (entry: NewHospitalEntry) => void;
}


const HospitalForm = ({onSubmit }: props) => {

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

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