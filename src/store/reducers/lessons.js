import { GET_LESSONS, GET_LESSON } from "../actions/types.js";

const initialState = {
  lessons: [],
  currentLesson: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
      };
    case GET_LESSON:
      return {
        ...state,
        currentLesson: action.payload,
      };
    default:
      return state;
  }
}
