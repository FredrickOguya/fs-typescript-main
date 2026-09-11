import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch} from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "../../shared/types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();

    void axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
    .then(response => setDiagnoses(response.data));

  
  }, []);
  
  const match = useMatch('/patients/:id');

  const patient = match ? patients.find((p) => p.id === match.params.id) : null;

  return (
    <div className="App">
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientPage diagnoses={diagnoses} patient= {patient} setPatients={setPatients} />} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
