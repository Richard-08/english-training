import { GET_USER_STATS } from "../actions/types.js";

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_STATS:
      return {
        ...state,
        data: [...action.payload],
      };
    default:
      return state;
  }
}
