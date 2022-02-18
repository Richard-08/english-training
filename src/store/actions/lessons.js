import lessonService from "../../services/api/lessons";
import { tokenConfig } from "./auth";
import { GET_LESSONS, GET_LESSON, LOADING, LOADED } from "./types";
import { returnErrors } from "./messages";

export const getLessons = () => (dispatch, getState) => {
  const { lessons } = getState().lessons;

  if (!(lessons && lessons.length)) {
    dispatch({ type: LOADING });

    const payload = tokenConfig(getState);

    lessonService
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

export const getLesson = ({ id }) => (dispatch, getState) => {
  dispatch({ type: LOADING });

  const payload = {
    ...tokenConfig(getState),
  };

  lessonService
    .getLesson(id, payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: GET_LESSON, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.error));
    })
    .finally(() => dispatch({ type: LOADED }));
};
