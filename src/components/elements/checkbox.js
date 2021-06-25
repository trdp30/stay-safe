import React from "react";
import { Checkbox as Input } from "semantic-ui-react";

function Checkbox(props) {
  const { className, label, isChecked = false, setValue, elementId } = props;

  const handleChange = () => {
    setValue();
  };

  return (
    <Input
      id={elementId}
      label={label}
      className={className}
      onChange={handleChange}
      checked={isChecked}
    />
  );
}

export default Checkbox;
