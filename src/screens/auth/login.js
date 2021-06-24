import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { toastError } from "../../components/toast-helpers";
import { authenticateInitiate } from "../../store/actions/session.action";
import { getString, requiredCheck } from "../../utils/validations";
import AppContainer from "../../components/app-container";
import Input from "../../components/form-helpers/input";
import FormBase from "../../components/form-helpers/base";

const fields = [
  {
    type: "number",
    initialValue: { phone: "" },
    valuePath: "phone",
    label: "",
    placeholder: "Phone Number",
    shouldTrim: true,
    maxLength: "10",
    Component: Input,
    validate: (values) => {
      let error = requiredCheck(values, "phone");
      if (!error && getString(values.phone).length !== 10) {
        error = "Invalid phone number";
      }
      return error;
    }
  }
];

const Login = (props) => {
  const { triggerLogin, history, session } = props;
  const state = useMemo(() => ({ phone: "" }), []);

  const [isLoading, toggleLoading] = useState(false);
  const [credentialError, setCredentialError] = useState(null);

  const handleLogin = (values, actions) => {
    setCredentialError("");

    const onSuccess = () => {
      toggleLoading(false);
      actions.setSubmitting(false);
    };

    const onFailed = (error) => {
      if (error.response && (error.response.status === 400 || error.response.status === 401)) {
        setCredentialError(() => "Either username or password is incorrect");
      } else {
        setCredentialError(() => error.message);
        toastError(error);
      }
      actions.setSubmitting(false);
      toggleLoading(false);
    };

    const { phone } = values;
    const payload = {
      phone: getString(phone)
    };

    toggleLoading(true);
    triggerLogin(payload, { onSuccess, onFailed });
  };

  const redirect = (path) => {
    history.push(path);
  };

  useEffect(() => {
    if (session.isAuthenticated) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.isAuthenticated]);

  return (
    <AppContainer>
      <div className="centered seven wide column">
        <div className="ui segment login-wrapper">
          <div className="ui centered stackable grid margin-no height-full">
            <div className="row">
              <div className="twelve wide column">
                <div className="header text-center">Welcome to</div>
                <div className="header text-center">StaySafe</div>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <div className="description">Sign In</div>
                <div className="info">using you phone number</div>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <span className="text-size-small text-color-red">{credentialError}</span>
                <FormBase
                  fields={fields}
                  postRequest={handleLogin}
                  initialValues={state}
                  submitButtonLabel={"Get OTP"}
                  submitButtonClassNames={"ui primary button text-weight-normal button-login"}
                />
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column text-center">
                Didn't received OTP?{" "}
                <span
                  className="text-color-primary text-weight-bold cursor-pointer"
                  onClick={() => !isLoading && redirect("/signup")}>
                  Resend
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerLogin: (payload, actions = {}) => {
      dispatch(authenticateInitiate({ payload, actions }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
