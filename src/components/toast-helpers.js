import React from "react";
import { toast } from "react-toastify";
import clsx from "clsx";

function ToastHelper({ title = "", message = "", isIcon, icon }) {
  return (
    <div className="ui grid margin-no">
      {isIcon && (
        <div className="one wide middle aligned column">
          <i className={clsx(icon, "icon")}></i>
        </div>
      )}
      <div className="fourteen wide middle aligned column">
        <div className="text-size-medium">{title}</div>
        <p className="word-break">{message}</p>
      </div>
    </div>
  );
}

export function toastError(error, isIcon) {
  if (error && error.response && error.response.data && error.response.data.message) {
    const errorData = error.response.data;
    if (Array.isArray(errorData.message)) {
      error.response.data.message.forEach((e) => {
        return toast.error(
          <ToastHelper {...e} title={e.error} isIcon={isIcon} icon={"times circle outline"} />
        );
      });
    } else {
      toast.error(
        <ToastHelper
          {...errorData}
          err={errorData.error}
          isIcon={isIcon}
          icon={"times circle outline"}
        />
      );
    }
  } else if (error && error.response && error.response.data) {
    let e = {
      title: error.response.data.error,
      message: error.message
    };
    return toast.error(<ToastHelper {...e} />);
  } else {
    return toast.error(error.message);
  }
}
export function toastSuccess(message, isIcon) {
  if (message.title || message.message) {
    toast.success(<ToastHelper {...message} isIcon={isIcon} icon={"check circle outline"} />);
  } else {
    toast.success(message);
  }
}

export function toastInfo(message) {
  if (message.title || message.message) {
    toast.info(<ToastHelper {...message} isIcon={true} icon={"info circle"} />);
  } else {
    toast.info(message);
  }
}
