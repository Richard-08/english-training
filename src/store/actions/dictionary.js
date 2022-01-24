import service from "../../services/api/dictionary";
import { tokenConfig } from "./auth";
import { GET_DICTIONARY, GET_CATEGORIES, ADD_WORD, DELETE_WORD } from "./types";
import { returnErrors, createMessage } from "./messages";

export const getDictionary = () => (dispatch, getState) => {
  const payload = tokenConfig(getState);

  service
    .getDictionary(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: GET_DICTIONARY, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.error));
    });
};

export const getDictionaryCategories = () => (dispatch, getState) => {
  const payload = tokenConfig(getState);

  service
    .getDictionaryCategories(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: GET_CATEGORIES, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.error));
    });
};

export const addWord = (data) => (dispatch, getState) => {
  const payload = {
    ...tokenConfig(getState),
    body: data,
  };

  service
    .addWord(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch(createMessage({ message: "Word added", status: "success" }));
        dispatch({ type: ADD_WORD, payload: { ...data, ...res } });
      } else {
        throw res;
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.error));
    });
};

export const deleteWord = (id) => (dispatch, getState) => {
  const payload = {
    ...tokenConfig(getState),
    body: { id },
  };

  service
    .deleteWord(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: DELETE_WORD, payload: id });
        dispatch(createMessage({ message: "Word deleted", status: "success" }));
      } else {
        throw res;
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.error));
    });
};
