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
    FormCustomLayout,
    postRequest,
    submitButtonLabel = "",
    submitButtonClassNames = "",
    submitButtonFieldClassNames = "",
    customButtonProps = {},
    CustomButton,
    hasCustomButton = false
  } = props;

  const FormLayout = ({ field, ...rest }) => {
    const Layout = <FormDefaultLayout field={field} isSubmitting={rest.isSubmitting} />;
    if (FormCustomLayout) {
      return <FormCustomLayout field={field} isSubmitting={rest.isSubmitting} />;
    }
    return Layout;
  };

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

  let BottomLayout = ({ isSubmitting }) => (
    <div
      className={clsx(submitButtonFieldClassNames || "ui segment text-center border-radius-none")}>
      <button
        type="submit"
        className={clsx(submitButtonClassNames || "ui positive button padding-md", {
          loading: isSubmitting
        })}
        disabled={isSubmitting}>
        {submitButtonLabel}
      </button>
    </div>
  );

  if (hasCustomButton) {
    BottomLayout = CustomButton;
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validate={validate}>
      {({ handleSubmit, status, isSubmitting, setSubmitting }) => (
        <Form onSubmit={handleSubmit} className={clsx("form-container", formClassNames)}>
          {fields.map((field) => (
            <FormLayout
              key={field.valuePath}
              field={field}
              isSubmitting={isSubmitting}
              setSubmitting={setSubmitting}
            />
          ))}
          <BottomLayout
            handleSubmit={handleSubmit}
            status={status}
            isSubmitting={isSubmitting}
            setSubmitting={setSubmitting}
            {...customButtonProps}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormBase;

FormBase.propTypes = {
  fields: PropTypes.array.isRequired,
  FormCustomLayout: PropTypes.func,
  formClassNames: PropTypes.string,
  postRequest: PropTypes.func,
  submitButtonLabel: PropTypes.string,
  submitButtonClassNames: PropTypes.string,
  submitButtonFieldClassNames: PropTypes.string,
  customButtonProps: PropTypes.any,
  CustomButton: PropTypes.func,
  hasCustomButton: PropTypes.bool
};
