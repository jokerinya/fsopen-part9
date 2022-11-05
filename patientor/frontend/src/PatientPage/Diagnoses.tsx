import React from "react";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";

const SingleDiagnose = ({ diagnose }: { diagnose: Diagnosis }) => {
  return (
    <li>
      {diagnose.code} {diagnose.name}
    </li>
  );
};

const Diagnoses = ({
  codes
}: {
  codes: Array<Diagnosis["code"]> | undefined;
}) => {
  const [{ diagnoses }] = useStateValue();
  const showDiagnoses = diagnoses.filter((diagnose) =>
    codes?.includes(diagnose.code)
  );
  return (
    <ul>
      {showDiagnoses.map((d) => (
        <SingleDiagnose key={d.code} diagnose={d} />
      ))}
    </ul>
  );
};

export default Diagnoses;
