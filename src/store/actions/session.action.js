import { sessionActionTypes } from "../action-types";

export function authenticate(payload) {
  const { email, password } = payload;
  if (email !== "" && password !== "") {
    return {
      type: sessionActionTypes.AUTHENTICATION_SUCCESS
    };
  } else {
    alert("Fields can't be empty");
  }
}

export function unAuthenticate() {
  return {
    type: sessionActionTypes.UNAUTHENTICATED_SUCCESS
  };
}

export function unAuthenticateInitiate() {
  return {
    type: sessionActionTypes.UNAUTHENTICATED_REQUEST_INITIATED
  };
}

export function authenticateInitiate({ payload, actions }) {
  return {
    type: sessionActionTypes.AUTHENTICATION_REQUEST_INITIATED,
    payload,
    actions
  };
}

export function triggerOtp({ payload, actions }) {
  return {
    type: sessionActionTypes.AUTHENTICATION_OTP_REQUEST,
    payload,
    actions
  };
}
