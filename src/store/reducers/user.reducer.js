import { sessionActionTypes, userActionTypes } from "../action-types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_REQUEST_INITIATED: {
      return {
        ...state,
        error: null,
        isLoading: true
      };
    }
    case userActionTypes.USER_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null
      };
    }
    case userActionTypes.USER_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    case sessionActionTypes.UNAUTHENTICATED_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {}
      };
    }
    default:
      return state;
  }
};

export default userReducer;
