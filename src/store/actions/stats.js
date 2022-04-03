import lessonStatsService from "../../services/api/stats";
import { tokenConfig } from "./auth";
import { GET_USER_STATS } from "./types";
import { returnErrors } from "./messages";

export const getUserStats = () => (dispatch, getState) => {
  const payload = {
    ...tokenConfig(getState),
  };

  lessonStatsService
    .getUserStats(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: GET_USER_STATS, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => dispatch(returnErrors(err.error)));
};
