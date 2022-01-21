import { GET_LESSONS } from "../actions/types.js";

const initialState = {
  lessons: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
      };
    default:
      return state;
  }
}
