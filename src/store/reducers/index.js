import { combineReducers } from "redux";
import session from "./session.reducer";
import user from "./user.reducer";
import member from "./member.reducer";

const reducers = combineReducers({
  session,
  user,
  member
});

export default reducers;
