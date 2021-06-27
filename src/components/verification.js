import React, { useMemo } from "react";
import { requiredCheck } from "../utils/validations";
import AppContainer from "./app-container";
import Input from "./form-helpers/input";
import FormBase from "./form-helpers/base";

const fields = [
  {
    type: "text",
    initialValue: { otp: "" },
    valuePath: "otp",
    label: "",
    placeholder: "Enter OTP",
    shouldTrim: true,
    Component: Input,
    validate: (values) => requiredCheck(values, "otp")
  }
];

const VerificationView = (props) => {
  const {
    phone,
    handleLogin,
    isLoading,
    credentialError,
    getVerificationCode,
    toggleVerificationView
  } = props;
  const state = useMemo(() => ({ otp: "" }), []);

  return (
    <AppContainer>
      <div className="centered seven wide column">
        <div className="ui segment login-wrapper">
          <div className="ui centered stackable grid margin-no height-full">
            <div className="row">
              <div className="twelve wide column">
                <div className="header text-center">Enter OTP</div>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <div className="info text-center">
                  An OTP has been sent to XXX XXX {phone ? phone.toString().slice(6, 10) : "XXXX"}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <span className="text-size-small text-color-red">{credentialError}</span>
                <FormBase
                  fields={fields}
                  postRequest={handleLogin}
                  initialValues={state}
                  submitButtonFieldClassNames={"field text-center"}
                  submitButtonLabel={"Verify"}
                  submitButtonClassNames={"ui primary button text-weight-normal button-login"}
                />
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column text-center">
                Didn't received OTP?{" "}
                <span
                  className="text-color-primary text-weight-bold cursor-pointer"
                  onClick={() => !isLoading && getVerificationCode({ phone }, {})}>
                  Resend
                </span>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column text-center">
                Re-Enter phone number?{" "}
                <span
                  className="text-color-primary text-weight-bold cursor-pointer"
                  onClick={() => !isLoading && toggleVerificationView(false)}>
                  Click here.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default VerificationView;
