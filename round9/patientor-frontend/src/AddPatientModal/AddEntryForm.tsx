import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectFieldHealth, HealthOption, DiagnosisSelection } from "./FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthOptions: HealthOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.healthy, label: "Healthy"}
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        specialist: "",
        date: "",
        healthCheckRating: HealthCheckRating.healthy
      }}
      onSubmit={onSubmit}
      validate={
        _values => {
        // const requiredError = "Field is required";
        // const errors: { [field: string]: string } = {};
        // if (!values.name) {
        //   errors.name = requiredError;
        // }
        // if (!values.ssn) {
        //   errors.ssn = requiredError;
        // }
        // if (!values.dateOfBirth) {
        //   errors.dateOfBirth = requiredError;
        // }
        // if (!values.occupation) {
        //   errors.occupation = requiredError;
        // }
        // return errors;
      }
    }
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <h4>HealthCheck</h4>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            /> 
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <SelectFieldHealth
              label="HealthCheckRating"
              name="healthCheckRating"
              options={healthOptions}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
