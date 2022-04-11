import {
  GET_LESSONS,
  GET_LESSON,
  UPDATE_LESSON_STATS,
  RESET_PROGRESS,
  UPDATE_LESSON_SETTINGS,
} from "../actions/types.js";

const initialState = {
  data: {
    lessons: [],
    categories: [],
  },
  currentLessons: [],
};

function updateLessons(data, id, payload) {
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
        currentLessons: [
          ...state.currentLessons.filter(
            (lesson) => lesson.id !== action.payload.id
          ),
          action.payload,
        ],
      };
    case UPDATE_LESSON_STATS:
      return {
        ...state,
        data: {
          ...state.data,
          lessons: updateLessons(
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
          lessons: updateLessons(
            state.data.lessons,
            action.payload.lesson_id,
            action.payload
          ),
        },
        currentLessons: updateLessons(
          state.currentLessons,
          action.payload.lesson_id,
          {
            stats: action.payload,
          }
        ),
      };
    case UPDATE_LESSON_SETTINGS:
      return {
        ...state,
        data: {
          ...state.data,
          lessons: updateLessons(
            state.data.lessons,
            action.payload.lesson_id,
            action.payload
          ),
        },
        currentLessons: updateLessons(
          state.currentLessons,
          action.payload.lesson_id,
          {
            settings: action.payload,
          }
        ),
      };
    default:
      return state;
  }
}
