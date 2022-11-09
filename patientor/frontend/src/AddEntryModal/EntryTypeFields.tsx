import React from "react";
import { Field } from "formik";

import { EntryType } from "../types";
import { NumberField, TextField } from "../AddPatientModal/FormField";

interface Props {
  entryType: EntryType;
}

const EntryTypeFields = ({ entryType }: Props) => {
  switch (entryType) {
    case EntryType.HealthCheck:
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case EntryType.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );

    case EntryType.Hospital:
      return (
        <>
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );
    default:
      return null;
  }
};

export default EntryTypeFields;
