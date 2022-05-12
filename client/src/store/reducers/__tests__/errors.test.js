import { GET_ERRORS } from "../../actions/types";
import reducer from "../errors";

const initialState = {
  message: null,
  status: null,
};

test("Should return default state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

test("Should return errors data", () => {
  const payload = {
    message: "Message text",
    status: "success",
  };
  expect(reducer(initialState, { type: GET_ERRORS, payload })).toEqual(payload);
});
