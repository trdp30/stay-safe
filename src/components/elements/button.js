import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import clsx from "clsx";

function Button(props) {
  const { label, className, isDisable, isLoading, icon, showIcon, buttonId } = props;
  return (
    <div
      id={buttonId}
      className={clsx(
        "ui",
        className,
        { disabled: isDisable || isLoading },
        {
          loading: isLoading
        },
        "button"
      )}
      onClick={props.onClick}>
      {/* {showIcon && <FontAwesomeIcon icon={icon} className="margin-right-five" />} */}
      {label || "Next"}
    </div>
  );
}
export default Button;

Button.propTypes = {
  label: PropTypes.any,
  className: PropTypes.string,
  isDisable: PropTypes.bool,
  isLoading: PropTypes.bool,
  icon: PropTypes.any,
  showIcon: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
