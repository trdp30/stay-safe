import { all } from "redux-saga/effects";
import session from "./session.saga";
import user from "./user.saga";
import member from "./member.saga";

export default function* rootSaga() {
  yield all([session(), user(), member()]);
}
