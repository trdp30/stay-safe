import React, { Fragment } from "react";
import { Modal } from "semantic-ui-react";
import Button from "./elements/button";
import PropTypes from "prop-types";
import clsx from "clsx";
// import isNil from "lodash/isNil";

const AlertBox = (props) => {
  const {
    open,
    size,
    close,
    headerText,
    children,
    showPositive,
    positiveButtonLabel,
    onPositiveClick,
    isLoading,
    positiveButtonClassName,
    negativeButtonLabel,
    negativeButtonClassName,
    onNegativeClick,
    showNegative,
    useAsPositive,
    isNegativeBasic,
    showCloseButton,
    contentClassName,
    actionClassName,
    hideHeader,
    hideActions,
    centered,
    headerTextSize = "fourteen",
    isPositiveBasic,
    closeOnEscape = true,
    isNegativeDisabled,
    isPositiveDisabled,
    closeOnDimmerClick = true,
    actions = [],
    positiveButtonId = "positiveButtonId",
    negativeButtonId = "negativeButtonId",
    isHeader = true,
    disabledCloseButton = false
  } = props;

  const toggleAlert = () => close(false);

  return (
    <Modal
      size={size}
      open={open}
      onClose={toggleAlert}
      centered={centered}
      closeOnEscape={closeOnEscape}
      closeOnDimmerClick={closeOnDimmerClick}>
      {!hideHeader && (
        <Modal.Header
          className={clsx(
            `ui segment bg-mineshaft header text-center padding-sm-top padding-sm-bottom border-radius-none text-size-${headerTextSize}`,
            {
              lightblack: isHeader,
              "bg-white border-none border-radius-five": !isHeader
            }
          )}>
          {headerText}
          {showCloseButton && (
            <span
              className={`float-right  cursor-pointer ${isHeader ? "" : "text-color-monochrome"}`}
              onClick={() => !disabledCloseButton && toggleAlert()}>
              <i className="ui times icon"></i>
            </span>
          )}
        </Modal.Header>
      )}
      <Modal.Content className={contentClassName}>{children}</Modal.Content>
      {!hideActions && (
        <Modal.Actions
          className={clsx(`border-none text-center padding-no-top ${actionClassName} bg-white`, {
            "padding-bg-bottom": !isHeader
          })}>
          {actions.length ? (
            <Fragment>
              {actions.map((button) => (
                <Button
                  key={button.label}
                  label={button.label}
                  className={clsx(
                    { positive: button.isPositive },
                    { negative: button.isNegative },
                    { basic: button.isBasic },
                    button.className
                  )}
                  onClick={button.onClick}
                  isLoading={button.isLoading}
                  isDisable={button.isDisabled}
                />
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {showPositive && (
                <Button
                  buttonId={positiveButtonId}
                  label={positiveButtonLabel}
                  className={`ui positive ${
                    isPositiveBasic ? "basic" : ""
                  } button ${positiveButtonClassName}`}
                  onClick={onPositiveClick}
                  isLoading={isLoading}
                  isDisable={isPositiveDisabled}
                />
              )}
              {showNegative && (
                <Button
                  buttonId={negativeButtonId}
                  label={negativeButtonLabel}
                  className={`ui ${useAsPositive ? "positive" : "negative"} ${
                    isNegativeBasic ? "basic" : ""
                  } button ${negativeButtonClassName}`}
                  onClick={onNegativeClick}
                  isLoading={isLoading}
                  isDisable={isNegativeDisabled}
                />
              )}
            </Fragment>
          )}
        </Modal.Actions>
      )}
    </Modal>
  );
};

export default AlertBox;

AlertBox.propTypes = {
  open: PropTypes.bool.isRequired,
  size: PropTypes.string,
  close: PropTypes.func.isRequired,
  headerText: PropTypes.string,
  children: PropTypes.node.isRequired,
  showPositive: PropTypes.bool,
  positiveButtonLabel: PropTypes.string,
  onPositiveClick: PropTypes.func,
  isLoading: PropTypes.bool,
  positiveButtonClassName: PropTypes.string,
  negativeButtonLabel: PropTypes.string,
  negativeButtonClassName: PropTypes.string,
  onNegativeClick: PropTypes.func,
  showNegative: PropTypes.bool,
  useAsPositive: PropTypes.bool,
  isNegativeBasic: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  contentClassName: PropTypes.string,
  actionClassName: PropTypes.string,
  hideHeader: PropTypes.bool,
  hideActions: PropTypes.bool,
  centered: PropTypes.bool,
  headerTextSize: PropTypes.string,
  isPositiveBasic: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  isNegativeDisabled: PropTypes.bool,
  isPositiveDisabled: PropTypes.bool,
  closeOnDimmerClick: PropTypes.bool,
  isHeader: PropTypes.bool,
  disabledCloseButton: PropTypes.bool
};
