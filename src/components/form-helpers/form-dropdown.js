import React, { memo, useMemo, useRef } from "react";
import Dropdown from "../dropdown";
import { Form } from "semantic-ui-react";
import clsx from "clsx";
import { ErrorMessage, useField } from "formik";
// import timezones from "../../../utils/time-zones";
import PropTypes from "prop-types";

const FormDropdown = memo((props) => {
  const { field, isSubmitting } = props;
  const {
    placeholder,
    width,
    inputClassNames,
    valuePath,
    infoPlaceholder,
    listSource: fieldListSource,
    isDisabled = false
  } = field;
  const [formikField, meta] = useField({ name: valuePath });
  const listSource = useRef(fieldListSource);

  const hasError = useMemo(() => meta.error && meta.touched, [meta.error, meta.touched]);

  const value = useMemo(() => formikField.value, [formikField.value]);

  const onChange = (data, e) => {
    e.target.name = valuePath;
    e.target.value = data;
    formikField.onChange(e);
    if (!e.target.value) {
      formikField.onBlur(e);
    }
  };

  const onHandleBlur = (e) => {
    e.target.name = valuePath;
    formikField.onBlur(e);
  };
  return (
    <Form.Field
      width={width}
      className={clsx("text-color-black", inputClassNames, { error: hasError })}
      disabled={isDisabled || isSubmitting}
      key={valuePath}>
      <label>{field.label}</label>
      <Dropdown
        key={"dropdown"}
        isSearchEnabled={true}
        setSelectedOption={onChange}
        listSource={listSource.current}
        handleBlur={onHandleBlur}
        isRemote={false}
        selectedOption={value}
        name={valuePath}
        placeholder={placeholder}
      />
      <div className="info placeholder text-size-ten text-color-semilightgrey">
        {hasError ? (
          <span className="text-color-negative">
            <ErrorMessage name={valuePath} />
          </span>
        ) : (
          <span>{infoPlaceholder}</span>
        )}
      </div>
    </Form.Field>
  );
});

export default FormDropdown;

FormDropdown.propTypes = {
  field: PropTypes.object,
  isSubmitting: PropTypes.bool
};
