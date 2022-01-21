import service from "../../services/api";
import { returnErrors } from "./messages";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const payload = tokenConfig(getState);

  service
    .getUser(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: USER_LOADED, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => {
      //dispatch(returnErrors(err.error));
      dispatch({ type: AUTH_ERROR });
    });
};

export const login = (payload) => (dispatch) => {
  service
    .login({
      body: payload,
    })
    .then((res) => {
      if (res && !res.error) {
        console.log(res);
        dispatch({ type: LOGIN_SUCCESS, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.error));
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logout = () => (dispatch, getState) => {
  const payload = tokenConfig(getState);

  service
    .logout(payload)
    .then((res) => {
      if (res && !res.error) {
        console.log(res);
        dispatch({ type: LOGOUT_SUCCESS });
      } else {
        throw res;
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.error));
    });
};

export const register = (payload) => (dispatch) => {
  service
    .register({
      body: payload,
    })
    .then((res) => {
      if (res && !res.error) {
        console.log(res);
        dispatch({ type: REGISTER_SUCCESS, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.error));
      dispatch({ type: REGISTER_FAIL });
    });
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
