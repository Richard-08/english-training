import { GET_USER_STATS } from "../../actions/types.js";
import reducer from "../stats";

const initialState = {
  data: null,
};

test("Should return default state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

test("Should return updated data", () => {
  const payload = { progress: 5, user_id: 1, lesson_id: 1 };
  expect(reducer(initialState, { type: GET_USER_STATS, payload })).toEqual({
    data: payload,
  });
});
