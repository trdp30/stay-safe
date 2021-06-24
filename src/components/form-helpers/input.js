import React, { memo, useMemo, useState } from "react";
import { ErrorMessage, useField } from "formik";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import clsx from "clsx";

const getString = (value = "") => {
  return (value || "").toString().trim();
};

const Input = memo(({ field, ...props }) => {
  const { isSubmitting } = props;
  const {
    type,
    valuePath,
    placeholder,
    infoPlaceholder,
    inputClassNames,
    width,
    hasIcon,
    shouldTrim = false
  } = field;

  const [formikField, meta] = useField({ name: valuePath });

  const hasError = useMemo(() => meta.error && meta.touched, [meta.error, meta.touched]);

  const value = useMemo(() => formikField.value, [formikField.value]);

  const [visible, toggleVisible] = useState(false);

  const handleChange = (e) => {
    if (shouldTrim) {
      e.target.value = getString(e.target.value);
      formikField.onChange(e);
    } else {
      formikField.onChange(e);
    }
  };

  const handleBlur = (e) => {
    if (shouldTrim) {
      e.target.value = getString(e.target.value);
      formikField.onBlur(e);
    } else {
      formikField.onBlur(e);
    }
  };
  return (
    <Form.Field
      width={width}
      className={clsx("text-color-black", inputClassNames, { error: hasError })}
      required={field.isRequired}
      disabled={isSubmitting}>
      <label>{field.label}</label>
      <div className={clsx("ui input", { icon: hasIcon })}>
        <input
          className="text-color-black"
          type={visible ? "text" : type}
          onChange={handleChange}
          onBlur={handleBlur}
          min="1"
          value={value}
          name={valuePath}
          placeholder={placeholder}
        />
        {hasIcon && (
          <i
            className="icon padding-top-twelve cursor-pointer link"
            onClick={() => toggleVisible((prev) => !prev)}>
            {visible ? <i className="eye icon"></i> : <i className="eye slash outline icon"></i>}
          </i>
        )}
      </div>
      <div>
        {hasError ? (
          <span className="text-color-red text-size-small">
            <ErrorMessage name={valuePath} />
          </span>
        ) : (
          <span className="text-size-small">{infoPlaceholder}</span>
        )}
      </div>
    </Form.Field>
  );
});

export default Input;

Input.propTypes = {
  field: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool
};
