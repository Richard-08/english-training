import { LOADING, LOADED } from "../../actions/types";
import reducer from "../loading";

const initialState = {
  loading: false,
};

test("Should return default state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

test("Should set loading to true", () => {
  expect(reducer(initialState, { type: LOADING }).loading).toEqual(true);
});

test("Should set loading to false", () => {
  expect(reducer(initialState, { type: LOADED }).loading).toEqual(false);
});
