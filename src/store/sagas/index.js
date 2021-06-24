import { all } from "redux-saga/effects";
import session from "./session.saga";

export default function* rootSaga() {
  yield all([
    session(),
  ]);
}
