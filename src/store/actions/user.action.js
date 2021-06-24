import { userActionTypes } from "../action-types";

export function getCurrentUser() {
  return {
    type: userActionTypes.USER_REQUEST_INITIATED
  };
}

export function storeCurrentUser(payload) {
  return {
    type: userActionTypes.USER_REQUEST_SUCCESS,
    payload
  };
}
