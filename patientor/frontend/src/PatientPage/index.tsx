import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Patient } from "../types";
import Entries from "./Entries";
import GenderIcon from "./GenderIcon";

const PatientPage = () => {
  const patientId = useParams().id || "";
  const [{ patients }, dispatch] = useStateValue();

  const [patient, setPatient] = React.useState<Patient | undefined>(
    Object.values(patients).find((p) => p.id === patientId)
  );

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        // dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
        dispatch(updatePatient(patientFromApi));
        setPatient(patientFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    // Look first if it is in the state and has an ssn
    if (!patient || !patient.ssn) {
      console.log("fetched");
      void fetchPatient();
    }
  }, []);

  return (
    <div>
      <h3>
        {patient?.name} <GenderIcon gender={patient?.gender} />
      </h3>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <Entries entries={patient?.entries} />
    </div>
  );
};

export default PatientPage;
