import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import lessons from "./lessons";
import dictionary from "./dictionary";
import loading from "./loading";
import stats from "./stats";

export default combineReducers({
  auth,
  stats,
  errors,
  lessons,
  loading,
  messages,
  dictionary,
});
