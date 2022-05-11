import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from "../../actions/types";
import reducer from "../auth";

const initialState = {
  token: "token",
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

test("Should return initial state", () => {
  expect(reducer(initialState, {})).toEqual(initialState);
});

test("Should return isLoading equal to true", () => {
  expect(reducer(initialState, { type: USER_LOADING })).toEqual({
    token: "token",
    isAuthenticated: null,
    isLoading: true,
    user: null,
  });
});

test("Should return loaded user data", () => {
  const data = {
    id: 1,
    username: "Name",
  };
  expect(reducer(initialState, { type: USER_LOADED, payload: data })).toEqual({
    token: "token",
    isAuthenticated: true,
    isLoading: false,
    user: data,
  });
});

test("Should handle user register", () => {
  const data = {
    user: {
      id: 1,
      username: "Name",
    },
    token: "new_token",
  };
  expect(
    reducer(initialState, { type: REGISTER_SUCCESS, payload: data })
  ).toEqual({
    token: data.token,
    isAuthenticated: true,
    isLoading: false,
    user: data.user,
  });
});

test("Should handle user login", () => {
  const data = {
    user: {
      id: 1,
      username: "Name",
    },
    token: "new_token",
  };
  expect(reducer(initialState, { type: LOGIN_SUCCESS, payload: data })).toEqual(
    {
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
      user: data.user,
    }
  );
});

test("Should handle errors", () => {
  expect(reducer(initialState, { type: AUTH_ERROR })).toEqual({
    token: null,
    isAuthenticated: false,
    isLoading: false,
    user: null,
  });
});
