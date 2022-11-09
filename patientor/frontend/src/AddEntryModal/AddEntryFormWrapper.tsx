// 3rd party
import { useState, useCallback } from "react";
import * as yup from "yup";
// Ui 3rd party
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { SelectChangeEvent } from "@mui/material";
// Types and States
import { EntryType, NewEntry } from "../types";
// Components
import AddEntryForm from "./AddEntryForm";

// Yup schemas start
const healthCheckSchema = yup.object().shape({
  description: yup.string().min(12).required(),
  date: yup
    .string()
    .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
    .required(),
  specialist: yup.string().min(6).required(),
  diagnosisCodes: yup.array().of(yup.string()),
  healthCheckRating: yup
    .number()
    .typeError("health check rating must be a number")
    .min(0)
    .max(3)
    .required("Please enter a rating from 0(great) - 3(critical)")
});

const occupationalHealthCareSchema = yup.object().shape({
  description: yup.string().min(12).required(),
  date: yup
    .string()
    .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
    .required(),
  specialist: yup.string().min(6).required(),
  diagnosisCodes: yup.array().of(yup.string()),
  employerName: yup.string().min(3).required(),
  sickLeave: yup.object().shape({
    startDate: yup
      .string()
      .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
    endDate: yup
      .string()
      .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
  })
});

const hospitalSchema = yup.object().shape({
  description: yup.string().min(12).required(),
  date: yup
    .string()
    .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
    .required(),
  specialist: yup.string().min(6).required(),
  diagnosisCodes: yup.array().of(yup.string()),
  discharge: yup
    .object({
      date: yup
        .string()
        .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
        .required("discharge date is a required field"),
      criteria: yup
        .string()
        .min(12)
        .required("discharge criteria is a required field")
    })
    .required()
});
// Yup schemas end

// Initial Values Start
const baseInitialValues = {
  description: "",
  date: "",
  specialist: ""
};

const healthCheckInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0
};

const occupationalHealthCareIntitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.OccupationalHealthcare,
  employerName: "",
  sickLeave: { startDate: "", endDate: "" }
};

const hospitalIntitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.Hospital,
  discharge: { date: "", criteria: "" }
};
// Initial Values End

// Entry type select options
const typeSelectOptions = [
  {
    key: EntryType.HealthCheck,
    value: EntryType.HealthCheck,
    text: "Health Check"
  },
  {
    key: EntryType.OccupationalHealthcare,
    value: EntryType.OccupationalHealthcare,
    text: "Occupational Health Care"
  },
  { key: EntryType.Hospital, value: EntryType.Hospital, text: "Hospital" }
];

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryFormWrapper = ({ onCancel, onSubmit }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const handleLabelChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as EntryType;
    setEntryType(value);
  };

  const entryForm = useCallback(() => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <AddEntryForm
            initialValues={healthCheckInitialValues}
            validationSchema={healthCheckSchema}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.OccupationalHealthcare:
        return (
          <AddEntryForm
            initialValues={occupationalHealthCareIntitialValues}
            validationSchema={occupationalHealthCareSchema}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.Hospital:
        return (
          <AddEntryForm
            initialValues={hospitalIntitialValues}
            validationSchema={hospitalSchema}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      default:
        return null;
    }
  }, [entryType, onCancel, onSubmit]);

  return (
    <>
      {/* This form is for selecting the entry type */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Entry Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={entryType}
          onChange={handleLabelChange}
          label="Entry Type"
        >
          {typeSelectOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text || option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider />
      {/* This function will produce a formik form for propriate entry type  */}
      {entryForm()}
    </>
  );
};

export default AddEntryFormWrapper;
