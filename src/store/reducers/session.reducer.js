import { sessionActionTypes } from "../action-types";
const initialState = {
  isLoading: false,
  isAuthenticated: false,
  expiresIn: null,
  refreshToken: null,
  token: null
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        expiresIn: action.payload.expiresIn,
        refreshToken: action.payload.refresh_token,
        token: action.payload.token
      };
    case "UNAUTHENTICATED_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        expiresIn: null,
        refreshToken: null,
        token: null
      };
    }
    case sessionActionTypes.UNAUTHENTICATED_REQUEST_INITIATED: {
      return {
        ...state,
        isLoading: true
      };
    }

    case sessionActionTypes.AUTHENTICATION_REQUEST_INITIATED: {
      return {
        ...state,
        isLoading: true
      };
    }
    default:
      return state;
  }
};

export default session;
