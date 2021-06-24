import { combineReducers } from "redux";
import session from "./session.reducer";
import user from "./user.reducer";

const reducers = combineReducers({
  session,
  user
});

export default reducers;
