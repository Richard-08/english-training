import { GET_LESSONS, GET_LESSON, UPDATE_LESSON_STATS } from "../actions/types.js";

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
    case UPDATE_LESSON_STATS:
      return {
        ...state,
        lessons: state.lessons.map(lesson => {
          if (lesson.id === action.payload.id) {
            return {
              ...lesson,
              ...action.payload
            }
          }
          return lesson;
        })
      };
    default:
      return state;
  }
}
