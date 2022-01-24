import service from "../../services/api";
import { tokenConfig } from "./auth";
import { GET_LESSONS, LOADING, LOADED } from "./types";
import { returnErrors } from "./messages";

export const getLessons = () => (dispatch, getState) => {
  const { lessons } = getState().lessons;

  if (!(lessons && lessons.length)) {
    dispatch({ type: LOADING });

    const payload = tokenConfig(getState);

    service
      .getLessonsData(payload)
      .then((res) => {
        if (res && !res.error) {
          dispatch({ type: GET_LESSONS, payload: res });
        } else {
          throw res;
        }
      })
      .catch((err) => {
        dispatch(returnErrors(err.error));
      })
      .finally(() => dispatch({ type: LOADED }));
  }
};
