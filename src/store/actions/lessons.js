import service from "../../services/api";
import { tokenConfig } from "./auth";
import { GET_LESSONS } from "./types";
import { returnErrors } from "./messages";

export const getLessons = () => (dispatch, getState) => {
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
    });
};
