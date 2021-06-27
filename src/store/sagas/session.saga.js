import { all, takeLatest, fork, call, put } from "redux-saga/effects";
import { sessionActionTypes as types } from "../action-types";
import { storeCurrentUser } from "../actions/user.action";
import { createRecord, getRecord } from "../server";

function* workerAuthenticate({ payload, actions }) {
  try {
    const response = yield call(createRecord, "login", payload);
    if (response.data.token) {
      let tokenData = {
        expiresIn: response.data.expiresIn,
        refreshToken: response.data.refresh_token,
        token: response.data.token
      };

      const userResponse = yield call(getRecord, "me", {
        headers: {
          authorization: `Bearer ${tokenData.token}`
        }
      });

      yield put(storeCurrentUser(userResponse.data));

      tokenData.role = userResponse.data.role;

      localStorage.setItem("stay-safe-session", JSON.stringify(tokenData));
      yield put({ type: types.AUTHENTICATION_SUCCESS, payload: tokenData });
      if (actions.onSuccess) {
        yield call(actions.onSuccess, response.data);
      }
    } else {
      let error = "User not found";
      yield put({ type: types.AUTHENTICATION_REQUEST_FAILED, error: error });
      alert(error);
    }
  } catch (error) {
    if (actions.onFailed) {
      yield call(actions.onFailed, error);
    }
    yield put({ type: types.AUTHENTICATION_REQUEST_FAILED, error });
  }
}

function* workerUnAuthenticate() {
  try {
    localStorage.removeItem("stay-safe-session");
    yield put({ type: types.UNAUTHENTICATED_SUCCESS });
  } catch (error) {
    yield put({ type: types.AUTHENTICATION_REQUEST_FAILED, error });
  }
}

function* workerTriggerOTP({ payload, actions }) {
  try {
    const response = yield call(createRecord, "get-otp", payload);

    if (actions.onSuccess) {
      yield call(actions.onSuccess, response.data);
    }
  } catch (error) {
    if (actions.onFailed) {
      yield call(actions.onFailed, error);
    }
  }
}

// -------------------- watchers --------------------
function* watcherAuthenticate() {
  yield takeLatest(types.AUTHENTICATION_REQUEST_INITIATED, workerAuthenticate);
}

function* watcherTriggerOTP() {
  yield takeLatest(types.AUTHENTICATION_OTP_REQUEST, workerTriggerOTP);
}

function* watcherUnAuthenticate() {
  yield takeLatest(types.UNAUTHENTICATED_REQUEST_INITIATED, workerUnAuthenticate);
}

export default function* rootSessionSaga() {
  yield all([fork(watcherAuthenticate), fork(watcherUnAuthenticate), fork(watcherTriggerOTP)]);
}
