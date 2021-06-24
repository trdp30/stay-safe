import { all, takeLatest, fork, call, put } from "redux-saga/effects";
import { userActionTypes as types } from "../action-types";
import { catchReduxError } from "../actions/general.action";
import { getRecord } from "../server";
import { storeCurrentUser } from "../actions/user.action";

// -------------------- worker ---------------------

function* workerFetchUser({ actions }) {
  try {
    const response = yield call(getRecord, "me");
    yield put(storeCurrentUser(response.data));
  } catch (error) {
    yield call(catchReduxError, types.USER_REQUEST_FAILED, error);
  }
}

// -------------------- watchers --------------------
function* watcherAuthenticate() {
  yield takeLatest(types.USER_REQUEST_INITIATED, workerFetchUser);
}

export default function* rootSessionSaga() {
  yield all([fork(watcherAuthenticate)]);
}
