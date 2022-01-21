import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import lessons from "./lessons";
import dictionary from "./dictionary";
import loading from './loading';

export default combineReducers({
  auth,
  errors,
  messages,
  lessons,
  dictionary,
  loading,
});
