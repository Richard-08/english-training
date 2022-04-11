import statsService from "../../services/api/stats";
import { tokenConfig } from "./auth";
import { GET_USER_STATS, LOADING, LOADED } from "./types";
import { returnErrors } from "./messages";

export const getUserStats = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
  const payload = {
    ...tokenConfig(getState),
  };

  statsService
    .getUserStats(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: GET_USER_STATS, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => dispatch(returnErrors(err.error)))
    .finally(() => dispatch({ type: LOADED }));
};
