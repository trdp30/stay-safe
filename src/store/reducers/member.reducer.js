import { memberActionTypes as types, sessionActionTypes } from "../action-types";
import { combineReducers } from "redux";
import { getById } from "./extract-id.reducer";

const initialState = {
  isLoading: false,
  error: null
};

const request = (state = initialState, action) => {
  switch (action.type) {
    case types.MEMBER_FIND_ALL_REQUEST_INITIATED:
    case types.MEMBER_FIND_BY_ID_REQUEST_INITIATED:
    case types.MEMBER_DELETE_REQUEST_INITIATED:
    case types.MEMBER_UPDATE_REQUEST_INITIATED:
    case types.MEMBER_CREATE_REQUEST_INITIATED: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case types.MEMBER_REQUEST_SUCCEED: {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    }
    case types.MEMBER_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    case sessionActionTypes.UNAUTHENTICATED_SUCCESS: {
      return {
        ...state,
        ...initialState
      };
    }
    default:
      return state;
  }
};

const dataReducer = combineReducers({
  byId: getById("member")
});

const memberReducer = combineReducers({
  request,
  data: dataReducer
});

export default memberReducer;
