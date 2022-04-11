import service from "../../services/api/dictionary";
import { tokenConfig } from "./auth";
import {
  GET_DICTIONARY,
  GET_CATEGORIES,
  ADD_WORD,
  DELETE_WORD,
  ADD_CATEGORY,
  DELETE_CATEGORY,
} from "./types";
import { returnErrors, createMessage } from "./messages";

export const getAll = () => (dispatch, getState) => {
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
  let send_data = {
    ...data,
    user_id: getState().auth.user.id,
  };

  const payload = {
    ...tokenConfig(getState),
    body: send_data,
  };

  service
    .addWord(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch(createMessage({ message: "Word added", status: "success" }));
        dispatch({ type: ADD_WORD, payload: { ...send_data, ...res } });
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
    body: { id, user_id: getState().auth.user.id },
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
      dispatch(returnErrors(err.error));
    });
};

export const addCategory = (data) => (dispatch, getState) => {
  let send_data = {
    ...data,
    user_id: getState().auth.user.id,
  };

  const payload = {
    ...tokenConfig(getState),
    body: send_data,
  };

  service
    .addCategory(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch(
          createMessage({ message: "Category added", status: "success" })
        );
        dispatch({ type: ADD_CATEGORY, payload: { ...send_data, ...res } });
      } else {
        throw res;
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.error));
    });
};

export const deleteCategory = (id) => (dispatch, getState) => {
  const payload = {
    ...tokenConfig(getState),
    body: { id, user_id: getState().auth.user.id },
  };

  service
    .deleteCategory(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: DELETE_CATEGORY, payload: id });
        dispatch(createMessage({ message: "Category deleted", status: "success" }));
      } else {
        throw res;
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.error));
    });
};
