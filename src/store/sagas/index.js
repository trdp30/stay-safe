import { all } from "redux-saga/effects";
import session from "./session.saga";
import user from "./user.saga";

export default function* rootSaga() {
  yield all([session(), user()]);
}
