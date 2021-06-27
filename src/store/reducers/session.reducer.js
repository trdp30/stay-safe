import { sessionActionTypes } from "../action-types";
const initialState = {
  isLoading: false,
  isAuthenticated: false,
  expiresIn: null,
  refreshToken: null,
  token: null,
  role: null
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        expiresIn: action.payload.expiresIn,
        refreshToken: action.payload.refreshToken,
        token: action.payload.token,
        role: action.payload.role
      };
    case "UNAUTHENTICATED_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        expiresIn: null,
        refreshToken: null,
        token: null,
        role: null
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
