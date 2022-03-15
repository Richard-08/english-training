import {
  GET_LESSONS,
  GET_LESSON,
  UPDATE_LESSON_STATS,
  RESET_PROGRESS,
} from "../actions/types.js";

const initialState = {
  data: {
    lessons: [],
    categories: [],
  },
  currentLessons: [],
};

function updateLessonStatsById(data, id, payload) {
  return data.map((lesson) => {
    if (lesson.id === id) {
      return {
        ...lesson,
        ...payload,
      };
    }
    return lesson;
  });
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LESSONS:
      return {
        ...state,
        data: { ...action.payload },
      };
    case GET_LESSON:
      return {
        ...state,
        currentLessons: [...state.currentLessons, action.payload],
      };
    case UPDATE_LESSON_STATS:
      return {
        ...state,
        data: {
          ...state.data,
          lessons: updateLessonStatsById(
            state.data.lessons,
            action.payload.lesson_id,
            action.payload
          ),
        },
      };
    case RESET_PROGRESS:
      return {
        ...state,
        data: {
          ...state.data,
          lessons: updateLessonStatsById(
            state.data.lessons,
            action.payload.lesson_id,
            action.payload
          ),
        },
        currentLessons: updateLessonStatsById(
          state.currentLessons,
          action.payload.lesson_id,
          { stats: action.payload }
        ),
      };
    default:
      return state;
  }
}
