import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import AddEntryModal from "../AddEntryModal";

import { apiBaseUrl } from "../constants";
import { setDiagnoses, updatePatient, useStateValue } from "../state";
import { Diagnosis, NewBaseEntry, Patient } from "../types";
import Entries from "./Entries";
import GenderIcon from "./GenderIcon";

const PatientPage = () => {
  const patientId = useParams().id || "";
  const [{ patients }, dispatch] = useStateValue();

  const [patient, setPatient] = React.useState<Patient | undefined>(
    Object.values(patients).find((p) => p.id === patientId)
  );

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses/`
        );
        // dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
        dispatch(updatePatient(patientFromApi));
        dispatch(setDiagnoses(diagnosesFromApi));
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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = (values: NewBaseEntry) => {
    try {
      console.log(values);
      // const { data: newPatient } = await axios.post<Patient>(
      //   `${apiBaseUrl}/patients`,
      //   values
      // );
      // dispatch({ type: "ADD_PATIENT", payload: newPatient });
      // dispatch(addPatient(newPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h3>
        {patient?.name} <GenderIcon gender={patient?.gender} />
      </h3>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <Entries entries={patient?.entries} />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
