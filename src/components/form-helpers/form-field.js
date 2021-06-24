import React from "react";
import PropTypes from "prop-types";
import Input from "./input";

function FormField(props) {
  const { field, isSubmitting } = props;
  const { Component: FieldComponent, ...reset } = field;

  const Component = FieldComponent ? FieldComponent : null;
  if (Component) {
    return <Component field={reset} isSubmitting={isSubmitting} />;
  }
  return <Input field={reset} isSubmitting={isSubmitting} />;
}

export default FormField;

FormField.propTypes = {
  field: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool
};
