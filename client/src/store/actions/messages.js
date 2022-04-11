import { CREATE_MESSAGE, GET_ERRORS } from "./types";

export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

export const returnErrors = (error) => {
  return {
    type: GET_ERRORS,
    payload: error,
  };
};
