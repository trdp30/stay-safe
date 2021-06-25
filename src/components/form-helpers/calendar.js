import React, { useState, useMemo, forwardRef } from "react";
import { ErrorMessage, useField } from "formik";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

function Calendar(props) {
  const { field, isSubmitting } = props;
  const {
    valuePath,
    placeholder,
    inputClassNames,
    width,
    isDisabled = false,
    isRequired,
    label
  } = field;

  const [formikField, meta] = useField({ name: valuePath });

  const hasError = useMemo(() => meta.error && meta.touched, [meta.error, meta.touched]);

  const value = useMemo(() => formikField.value, [formikField.value]);

  const [timeCutOff] = useState({
    min: moment().subtract(100, "y").toDate(),
    max: moment().subtract(17, "y").toDate()
  });

  const handleOnBlur = (e) => {
    e.target = {
      name: valuePath
    };
    formikField.onBlur(e);
  };
  const handleOnChange = (date) => {
    formikField.onChange({ target: { name: valuePath, value: date } });
  };

  return (
    <Form.Field
      width={width}
      required={isRequired}
      className={clsx("text-color-black", inputClassNames, { error: hasError })}
      disabled={isDisabled || isSubmitting}>
      <label>{label}</label>
      <DatePicker
        className={"text-color-black width-full"}
        dateFormat="dd/MM/yyyy"
        selected={value}
        showYearDropdown={true}
        yearDropdownItemNumber={100}
        scrollableYearDropdown={true}
        onChange={handleOnChange}
        maxDate={timeCutOff.max}
        minDate={timeCutOff.min}
        onBlur={handleOnBlur}
        placeholderText={placeholder}
        customInput={<CustomInput />}
      />
      <div className="info placeholder text-size-ten text-color-negative">
        <ErrorMessage name={props.field.valuePath} />
      </div>
    </Form.Field>
  );
}

export default Calendar;

const CustomInput = forwardRef(({ placeholder, value, onClick, ...rest }, ref) => (
  <div className={clsx("ui input icon")} onClick={onClick}>
    <input
      className="text-color-black"
      value={value}
      placeholder={placeholder}
      ref={ref}
      {...rest}
    />
    <i className="icon calendar icon cursor-pointer link text-color-black"></i>
  </div>
));
Calendar.propTypes = {
  field: PropTypes.object,
  isSubmitting: PropTypes.bool
};
