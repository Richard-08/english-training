import {
  GET_DICTIONARY,
  GET_CATEGORIES,
  ADD_WORD,
  DELETE_WORD,
  ADD_CATEGORY,
  DELETE_CATEGORY,
} from "../../actions/types";
import reducer from "../dictionary";

const initialState = {
  dictionary: [],
  categories: [],
};

const TEST_WORD = { id: 1, en: "word", ru: "слово", user_id: 1 };
const TEST_CATEGORY = { id: "test", name: "Category name", user_id: 1 };

test("Should return default state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

test("Should return dictionary and categories data", () => {
  const payload = {
    dictionary: [TEST_WORD],
    categories: [TEST_CATEGORY],
  };

  expect(
    reducer(undefined, {
      type: GET_DICTIONARY,
      payload,
    })
  ).toEqual(payload);
});

test("Should return categories", () => {
  const categories = [TEST_CATEGORY];
  expect(
    reducer(initialState, { type: GET_CATEGORIES, payload: categories })
  ).toEqual({
    dictionary: [],
    categories,
  });
});

test("Must add the word to the dictionary", () => {
  expect(
    reducer(initialState, { type: ADD_WORD, payload: TEST_WORD }).dictionary
  ).toContainEqual(TEST_WORD);
});

test("Must remove word from dictionary", () => {
  const state = {
    dictionary: [TEST_WORD],
    categories: [],
  };

  expect(
    reducer(state, { type: DELETE_WORD, payload: 1 }).dictionary
  ).not.toContainEqual(TEST_WORD);
});

test("Must add the category to the categories", () => {
  expect(
    reducer(initialState, { type: ADD_CATEGORY, payload: TEST_CATEGORY })
      .categories
  ).toContainEqual(TEST_CATEGORY);
});

test("Must remove category from categories", () => {
  const state = {
    dictionary: [],
    categories: [TEST_CATEGORY],
  };

  expect(
    reducer(state, { type: DELETE_CATEGORY, payload: "test" }).categories
  ).not.toContainEqual(TEST_CATEGORY);
});
