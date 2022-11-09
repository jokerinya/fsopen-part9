import { Field, Form, Formik } from "formik";
import React from "react";
import { NewEntry } from "../types";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { Button, Grid } from "@material-ui/core";
import { useStateValue } from "../state";
import EntryTypeFields from "./EntryTypeFields";
import * as yup from "yup";

interface Props {
  initialValues: NewEntry;
  validationSchema: yup.ObjectSchema;
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({
  onSubmit,
  onCancel,
  initialValues,
  validationSchema
}: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {/* This component will contains entry's type special fields. */}
            <EntryTypeFields entryType={values.type} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right"
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
