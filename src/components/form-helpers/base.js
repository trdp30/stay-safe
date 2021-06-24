import React from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import FormDefaultLayout from "./form-default-layout";
import clsx from "clsx";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";

const FormBase = (props) => {
  const {
    fields,
    initialValues,
    formClassNames = "",
    postRequest,
    submitButtonLabel = "",
    submitButtonClassNames = ""
  } = props;

  const validate = (values) => {
    let errors = {};
    fields.forEach((field) => {
      if (field.validate) {
        errors = { ...errors, [field.valuePath]: field.validate(values) };
      }
    });
    return omitBy(errors, isNil);
  };

  const onSubmit = (values, actions) => {
    if (postRequest) {
      postRequest(values, actions);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit, status, isSubmitting, setSubmitting }) => (
        <Form onSubmit={handleSubmit} className={clsx("form-container", formClassNames)}>
          {fields.map((field) => (
            <FormDefaultLayout
              key={field.valuePath}
              field={field}
              isSubmitting={isSubmitting}
              setSubmitting={setSubmitting}
            />
          ))}
          <div className={clsx("field text-center padding-top-big")}>
            {status && <p className="text-color-red">{status}</p>}
            <button
              type="submit"
              className={clsx(submitButtonClassNames || "ui primary button padding-md", {
                loading: isSubmitting
              })}
              disabled={isSubmitting}>
              {submitButtonLabel}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormBase;

FormBase.propTypes = {
  fields: PropTypes.array.isRequired,
  formClassNames: PropTypes.string,
  postRequest: PropTypes.func,
  submitButtonLabel: PropTypes.string,
  submitButtonClassNames: PropTypes.string
};
