import { UPDATE_LESSON_SETTINGS } from "./types";
import lessonSettingsService from "../../services/api/lessonSettings";
import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

export const updateLessonSettings = (data) => (dispatch, getState) => {
  const payload = {
    ...tokenConfig(getState),
    body: { ...data },
  };

  lessonSettingsService
    .updateSettings(payload)
    .then((res) => {
      if (res && !res.error) {
        dispatch({ type: UPDATE_LESSON_SETTINGS, payload: res });
      } else {
        throw res;
      }
    })
    .catch((err) => dispatch(returnErrors(err.error)));
};
