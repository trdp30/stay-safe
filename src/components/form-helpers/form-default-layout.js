import React, { memo } from "react";
import PropTypes from "prop-types";
import FormField from "./form-field";
// import clsx from "clsx";

const FormDefaultLayout = memo((props) => {
  const { field, isSubmitting } = props;

  return <FormField field={field} isSubmitting={isSubmitting} />;
});

export default FormDefaultLayout;

FormDefaultLayout.propTypes = {
  field: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool
};
