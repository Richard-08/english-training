import lessonStatsService from "../../services/api/lessonStats";
import { tokenConfig } from "./auth";
import { UPDATE_LESSON_STATS, RESET_PROGRESS } from "./types";
import { returnErrors } from "./messages";

export const updateLessonStats = (data) => (dispatch, getState) => {
  const payload = {
    ...tokenConfig(getState),
    body: { ...data },
  };

  lessonStatsService
    .updateStats(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: UPDATE_LESSON_STATS, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => dispatch(returnErrors(err.error)));
};

export const resetProgress = (id) => (dispatch, getState) => {
  const payload = {
    ...tokenConfig(getState),
    params: {
      id,
    },
  };

  lessonStatsService
    .resetProgress(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: RESET_PROGRESS, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => dispatch(returnErrors(err.error)));
};
