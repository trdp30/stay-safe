import { memberActionTypes as types } from "../action-types";
import { all, takeLatest, fork, call, put } from "redux-saga/effects";
import { catchReduxError, normalizeData } from "../actions/general.action";
import { createRecord, findAll, findRecord } from "../server";
import { memberArraySchema, memberSchema } from "../schemas";
import { storeMember } from "../actions/member.action";

// -------------------- worker ---------------------

function* workerCreateMember({ payload, actions }) {
  try {
    const response = yield call(createRecord, "member", payload);
    const normalizedData = yield call(normalizeData, {
      data: response.data,
      schema: memberSchema
    });
    yield put(storeMember(normalizedData));
    if (actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions.onFailed) {
      yield call(actions.onFailed);
    }
    yield call(catchReduxError, types.MEMBER_REQUEST_FAILED, error);
  }
}

function* workerFindAllMember({ actions }) {
  try {
    const response = yield call(findAll, "member");
    const normalizedData = yield call(normalizeData, {
      data: response.data,
      schema: memberArraySchema
    });
    yield put(storeMember(normalizedData));
    if (actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions.onFailed) {
      yield call(actions.onFailed);
    }
    yield call(catchReduxError, types.MEMBER_REQUEST_FAILED, error);
  }
}

function* workerFindByIdMember({ member_id, actions }) {
  try {
    const response = yield call(findRecord, "member", member_id);
    const normalizedData = yield call(normalizeData, {
      data: response.data,
      schema: memberSchema
    });
    yield put(storeMember(normalizedData));
    if (actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions.onFailed) {
      yield call(actions.onFailed);
    }
    yield call(catchReduxError, types.MEMBER_REQUEST_FAILED, error);
  }
}

function* workerBookAppointment({ payload, actions }) {
  try {
    const response = yield call(createRecord, "book-vaccine", { data: payload });
    const normalizedData = yield call(normalizeData, {
      data: response.data,
      schema: memberArraySchema
    });
    yield put(storeMember(normalizedData));
    if (actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions.onFailed) {
      yield call(actions.onFailed);
    }
    yield call(catchReduxError, types.MEMBER_REQUEST_FAILED, error);
  }
}

// -------------------- watchers --------------------
function* watcherCreateMember() {
  yield takeLatest(types.MEMBER_CREATE_REQUEST_INITIATED, workerCreateMember);
}

function* watcherFindAllMember() {
  yield takeLatest(types.MEMBER_FIND_ALL_REQUEST_INITIATED, workerFindAllMember);
}

function* watcherFindByIdMember() {
  yield takeLatest(types.MEMBER_FIND_BY_ID_REQUEST_INITIATED, workerFindByIdMember);
}

function* watcherBookAppointment() {
  yield takeLatest(types.MEMBER_BOOK_APPOINTMENT_REQUEST_INITIATED, workerBookAppointment);
}

export default function* rootSessionSaga() {
  yield all([
    fork(watcherCreateMember),
    fork(watcherFindByIdMember),
    fork(watcherFindAllMember),
    fork(watcherBookAppointment)
  ]);
}
